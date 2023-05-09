import { Flex, Spacer, Text } from '@chakra-ui/react';

type HeaderPanelProps = {
    title: string;
    trainingButton: JSX.Element;
    profileMenu: JSX.Element;
};

export const HeaderRaw = ({ title, trainingButton, profileMenu }: HeaderPanelProps) => {
    return (
        <Flex direction={['column', 'row']} backgroundColor={'blue.600'} mb={3}>
            <Text fontSize={'4xl'} color={'gray.50'} fontWeight={'bold'}>
                {title}
            </Text>

            <Spacer />

            <Flex alignItems={'center'} gap={2}>
                <Spacer />
                {trainingButton}
                {profileMenu}
                <Spacer />
            </Flex>
        </Flex>
    );
};
