// import React, {ChangeEvent, Component} from 'react';
//
// type propsType = {
//     status: string,
//     updateStatusProfile: (status: string) => void
// }
//
// type stateType = {
//     editMode: boolean,
//     status: string
//
// }
//
// export class ProfileStatus extends Component<propsType, stateType> {
//     state = {
//         editMode: false,
//         status: this.props.status
//     }
//
//     activateEditMode = () => {
//         this.setState({
//             editMode: true
//         })
//     }
//
//     deactivateEditMode = () => {
//         this.setState({
//             editMode: false
//         })
//         this.props.updateStatusProfile(this.state.status)
//     }
//
//     onInputStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
//         this.setState({
//             status: e.currentTarget.value
//         })
//     }
//
//     componentDidUpdate(prevProps: Readonly<propsType>, prevState: Readonly<stateType>, snapshot?: any): void {
//         if (this.props.status !== prevProps.status) {
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }
//
//     render() {
//
//         return (
//             <div>
//                 {!this.state.editMode
//                     ? <div onDoubleClick={this.activateEditMode}
//                            className='noSelect'>
//                         <span>{this.props.status}</span>
//                     </div>
//                     : <div>
//                         <input type="text"
//                                value={this.state.status}
//                                onBlur={this.deactivateEditMode}
//                                onChange={this.onInputStatusChange}/>
//                     </div>
//                 }
//             </div>
//
//         );
//     }
// }
//

import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';
import {Input, TextField} from "@mui/material";

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    useEffect(() => {
        if (status !== props.status) {
            setStatus(props.status);
        }
    }, [])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onChangeInputValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let newStatus = e.currentTarget.value;
        if (newStatus) {
            setStatus(newStatus);
        }
    }

    return (
        <div className={s.profileStatus}>
            {!editMode
                ? <div>
                    <span className={s.status}>Status:</span>
                    <span
                        className={s.statusText}
                        onDoubleClick={activateEditMode}
                    >
                        {props.status}
                    </span>
                </div>
                : <div>
                    <TextField
                        id="standard-basic"
                        label="Status"
                        variant="standard"
                        onBlur={deactivateEditMode}
                        autoFocus={true}
                        onChange={onChangeInputValue}
                        value={status}
                    />
                </div>
            }
        </div>
    );
};
