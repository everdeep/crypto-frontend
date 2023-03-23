import React from 'react';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

interface ConfirmModalProps {
    setOpen: (open: boolean) => void;
    open: boolean;
    handleConfirm: () => void;
    message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ setOpen, open, handleConfirm, message }) => {
    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            open={open}
            size='small'
        >
            <Header icon>
                <Icon name='archive' />
                Confirmation
            </Header>
            <Modal.Content>
                <p>
                    {message}
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    basic
                    color='red'
                    inverted
                    onClick={() => setOpen(false)}
                >
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={handleConfirm}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};