# People API - DTOs e Endpoints

Documentação dos DTOs de request e response em formato JSON para todas as operações do fluxo de pessoas (compartilhamento de conta).

---

## 1. POST /people

**Descrição:** Criar pessoa e enviar convite por email (máximo 4 pessoas ativas).

**Autenticação:** Bearer token obrigatório.

### Request (CreatePersonDto)

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "accessLevel": "READ_WRITE"
}
```

| Campo       | Tipo   | Obrigatório | Descrição                                                                 |
|-------------|--------|-------------|---------------------------------------------------------------------------|
| name        | string | sim         | Nome da pessoa (máx. 255 caracteres)                                     |
| email       | string | sim         | E-mail da pessoa (formato válido)                                        |
| accessLevel | enum   | sim         | Nível de acesso: `READ_ONLY`, `READ_WRITE`, `READ_WRITE_RESTRICTED`       |

### Response 201 (PersonResponseDto)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@example.com",
  "accessLevel": "READ_WRITE",
  "status": "PENDING",
  "createdAt": "2026-03-15T18:30:00.000Z",
  "updatedAt": "2026-03-15T18:30:00.000Z"
}
```

---

## 2. GET /people

**Descrição:** Listar pessoas com acesso à conta.

**Autenticação:** Bearer token obrigatório.

### Request

Nenhum body. Parâmetros via URL: nenhum.

### Response 200 (PersonResponseDto[])

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "accessLevel": "READ_WRITE",
    "status": "ACTIVE",
    "createdAt": "2026-03-15T18:30:00.000Z",
    "updatedAt": "2026-03-15T19:00:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Maria Santos",
    "email": "maria@example.com",
    "accessLevel": "READ_ONLY",
    "status": "PENDING",
    "createdAt": "2026-03-15T20:00:00.000Z",
    "updatedAt": "2026-03-15T20:00:00.000Z"
  }
]
```

---

## 3. GET /people/access-history

**Descrição:** Histórico de acessos à conta.

**Autenticação:** Bearer token obrigatório.

### Request

Nenhum body. Parâmetros via URL: nenhum.

### Response 200 (AccessLogResponseDto[] com sharedPerson)

```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "sharedPersonId": "550e8400-e29b-41d4-a716-446655440000",
    "ownerId": "880e8400-e29b-41d4-a716-446655440003",
    "accessLevel": "READ_WRITE",
    "action": "UPDATED",
    "description": "Nível de acesso alterado de Leitura para Leitura e escrita",
    "createdAt": "2026-03-15T19:30:00.000Z",
    "sharedPerson": {
      "name": "João Silva",
      "email": "joao@example.com"
    }
  },
  {
    "id": "770e8400-e29b-41d4-a716-446655440001",
    "sharedPersonId": "550e8400-e29b-41d4-a716-446655440000",
    "ownerId": "880e8400-e29b-41d4-a716-446655440003",
    "accessLevel": "READ_WRITE",
    "action": "CREATED",
    "description": "João Silva convidado para acessar a conta",
    "createdAt": "2026-03-15T18:30:00.000Z",
    "sharedPerson": {
      "name": "João Silva",
      "email": "joao@example.com"
    }
  }
]
```

---

## 4. PATCH /people/:id

**Descrição:** Atualizar nível de acesso de uma pessoa.

**Autenticação:** Bearer token obrigatório.

**Parâmetro de URL:** `id` (UUID da pessoa)

### Request (UpdatePersonDto)

```json
{
  "accessLevel": "READ_WRITE_RESTRICTED"
}
```

| Campo       | Tipo | Obrigatório | Descrição                                                           |
|-------------|------|-------------|---------------------------------------------------------------------|
| accessLevel | enum | não         | Nível de acesso: `READ_ONLY`, `READ_WRITE`, `READ_WRITE_RESTRICTED` |

### Response 200 (PersonResponseDto)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@example.com",
  "accessLevel": "READ_WRITE_RESTRICTED",
  "status": "ACTIVE",
  "createdAt": "2026-03-15T18:30:00.000Z",
  "updatedAt": "2026-03-15T19:45:00.000Z"
}
```

---

## 5. DELETE /people/:id

**Descrição:** Remover pessoa da conta.

**Autenticação:** Bearer token obrigatório.

**Parâmetro de URL:** `id` (UUID da pessoa)

### Request

Nenhum body.

### Response 204

Sem conteúdo no body.

---

## 6. GET /people/activate/:token

**Descrição:** Validar token de ativação e retornar dados do convite (endpoint público).

**Autenticação:** Não requerida (público).

**Parâmetro de URL:** `token` (token de ativação recebido por email)

### Request

Nenhum body.

### Response 200

```json
{
  "name": "João Silva",
  "email": "joao@example.com"
}
```

---

## 7. POST /people/activate

**Descrição:** Ativar conta com token e definir senha (endpoint público).

**Autenticação:** Não requerida (público).

### Request (ActivateAccountDto)

```json
{
  "token": "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
  "newPassword": "minhasenha123"
}
```

| Campo      | Tipo   | Obrigatório | Descrição                              |
|------------|--------|-------------|----------------------------------------|
| token      | string | sim         | Token de ativação recebido por email   |
| newPassword| string | sim         | Nova senha (mínimo 8 caracteres)      |

### Response 200

```json
{
  "message": "Conta ativada com sucesso. Faça login para acessar."
}
```

---

## Enums de referência

### SharedAccessLevel

| Valor                | Descrição                                      |
|----------------------|------------------------------------------------|
| READ_ONLY            | Leitura apenas                                 |
| READ_WRITE           | Leitura, criar, editar e excluir               |
| READ_WRITE_RESTRICTED| Leitura, criar, editar (sem excluir)           |

### Status da pessoa

| Valor   | Descrição                          |
|---------|------------------------------------|
| PENDING | Convite enviado, aguardando ativação |
| ACTIVE  | Conta ativada, acesso liberado     |
| REMOVED | Pessoa removida da conta           |

### Ações no histórico (action)

| Valor    | Descrição                    |
|----------|------------------------------|
| CREATED  | Pessoa convidada             |
| UPDATED  | Nível de acesso alterado     |
| REMOVED  | Pessoa removida da conta     |
| ACTIVATED| Conta ativada com sucesso    |
