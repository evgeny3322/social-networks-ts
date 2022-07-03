import React, {ChangeEvent, useEffect, useState} from 'react';
import s from '../ProfileInfo.module.css';
import {TextField} from "@mui/material";

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
    }, [props.status])

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
