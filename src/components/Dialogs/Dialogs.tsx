import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import {Textarea} from "../common/Forms/Forms";

type FormDataType = {
    newMessage: string
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field
                        component={Textarea}
                        name={'newMessage'}
                        validate={[required, maxLength50]}
                        placeholder={'Enter your message'}/>
                </div>
                <div>
                    <button>Send</button>
                </div>
            </div>
        </form>
    );
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: "dialogAddMessageForm"})(AddMessageForm);

const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d, index) =>
        <DialogItem
            key={d.id}
            id={d.id}
            name={d.name}
        />
    );

    const messagesElements = props.dialogsPage.messages.map((m, index) =>
        <Message
            key={m.id}
            id={m.id}
            message={m.message}
        />
    );

    const addNewMessage = (formData: FormDataType) => {
        console.log(formData)
        props.sendMessage(formData.newMessage);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;