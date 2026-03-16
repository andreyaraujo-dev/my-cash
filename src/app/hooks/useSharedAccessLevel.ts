import { useMemo } from 'react';
import { useUserAccessStore } from '@/app/store/useUserAccessStore';
import { SharedAccessLevel } from '@/app/entities/Person';

export function useSharedAccessLevel() {
  const sharedAccessLevel = useUserAccessStore((state) => state.sharedAccessLevel);
  const isAccountOwner = useUserAccessStore((state) => state.isAccountOwner);

  return useMemo(() => {
    if (isAccountOwner || !sharedAccessLevel) {
      return {
        canRead: true,
        canCreate: true,
        canEdit: true,
        canDelete: true,
      };
    }

    const canDelete = sharedAccessLevel === SharedAccessLevel.READ_WRITE;
    const canCreate =
      sharedAccessLevel === SharedAccessLevel.READ_WRITE ||
      sharedAccessLevel === SharedAccessLevel.READ_WRITE_RESTRICTED;
    const canEdit = canCreate;

    return {
      canRead: true,
      canCreate,
      canEdit,
      canDelete,
    };
  }, [sharedAccessLevel, isAccountOwner]);
}
