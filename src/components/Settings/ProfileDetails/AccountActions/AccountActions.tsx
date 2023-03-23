import React from 'react';
import { connect } from 'react-redux';
import { signOut, alertSet } from '@src/actions';
import { deleteUser } from '@src/api/userService';
import { ConfirmModal } from '@src/components/Modal';


interface AccountActionsProps {
    alert: any;
    signOut: () => void;
}

const AccountActions: React.FC<AccountActionsProps> = ({ alert, signOut }) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleDelete = () => {
        deleteUser().then((res: any) => {
            alertSet('Your account has been deleted.', 'success');
            signOut();
        }).catch((err: any) => {
            alertSet('An error occurred when deleting your account. Please contact support.', 'error');
            console.log(err);
        });
    }

    return (
        <div id='accountActions' className='content'>
            <label>Account Actions</label>
            <div>
                <button className='ui button red' onClick={handleOpen}>Delete account</button>
                <ConfirmModal open={open} setOpen={setOpen} handleConfirm={handleDelete} message="Are you sure you wish to delete your account?" />
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        alert: state.alert,
    };
};


export default connect(mapStateToProps, { signOut, alertSet })(AccountActions);