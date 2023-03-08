import React, { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../../../shared/ui/Input';

import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/shared/shared.button.types';
import { createForumThunk } from '../../../redux/actionCreators/forum';
import { Dispatcher } from '../../../redux/store';

const CreateForumForm = () => {
    const [nameTheme, setNameTheme] = useState('');
    const dispatch = useDispatch<Dispatcher>();
    const changeHandler:ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target as HTMLInputElement;
        setNameTheme(value);
    };

    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault();
        dispatch(createForumThunk(nameTheme));
    };

    return (
        <form>
            <div>
                <Input type="text" label="Название темы" onChange={changeHandler} value={nameTheme} />
            </div>
            <div>
                <Button
                    theme={ButtonTheme.GREEN}
                    size={ButtonSize.X}
                    onClick={handleClick}

                >
                    Создать тему
                </Button>
            </div>
        </form>
    );
};

export default CreateForumForm;
