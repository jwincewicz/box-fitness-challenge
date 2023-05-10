import { Training, useAuthQuery, useMobileQuery, useTrainingsQuery, useUsersQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { User } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { TrainingDeleteModal } from './Training.delete.modal';
import { TrainingsTableRaw } from './Trainings.table.raw';

export const TrainingsTable = () => {
    const { activitiesQuery } = useTrainingsQuery();
    const { users } = useUsersQuery();
    const { isAdmin } = useAuthQuery();
    const { isMobile } = useMobileQuery();
    const { user } = useAuthStore();

    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const [selectedActivity, setSelectedActivity] = useState<Training | null>(null);

    return (
        <>
            {selectedActivity && users.has(selectedActivity.userId) && isDeleteModalOpen && (
                <TrainingDeleteModal
                    user={users.get(selectedActivity.userId) as User}
                    activity={selectedActivity as Training}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                />
            )}
            <TrainingsTableRaw
                trainings={activitiesQuery.data ?? []}
                users={users}
                currentUserId={user.id}
                readonly={!isAdmin}
                handleDelete={(activity: Training) => {
                    setSelectedActivity(activity);
                    onDeleteModalOpen();
                }}
                isMobile={isMobile}
            />
        </>
    );
};
