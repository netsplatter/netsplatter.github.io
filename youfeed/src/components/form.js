import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameError: '',
            phone: '',
            phoneError: '',
            email: '',
            emailError: ''
        };
    };

    change(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    validate(){
        let isError = false;
        const errors = {
            nameError: '',
            phoneError: '',
            emailError: ''
        };

        if (this.state.name === ''){
            isError = true;
            errors.nameError = 'Поле не должно быть пустым';
        }

        if (this.state.phone === ''){
            isError = true;
            errors.phoneError = 'Поле не должно быть пустым';
        }

        if (this.state.email === ''){
            isError = true;
            errors.emailError = 'Поле не должно быть пустым';
        } else if (this.state.email.indexOf('@') === -1){
            isError = true;
            errors.emailError = 'Неправильный e-mail';
        }

        this.setState({
            ...errors
        });

        return isError;
    }

    onSubmit(e) {
        e.preventDefault();
        const err = this.validate();

        if (!err){
            this.props.onSubmit(this.state);

            this.setState({
                name: '',
                nameError: '',
                phone: '',
                phoneError: '',
                email: '',
                emailError: ''
            });
        }
    };

    render() {
        return (
            <form className="container-fluid contact-form" action="">
                <div className="wrapper clearfix">
                    <h3>Всегда готовы к сотрудничеству</h3>
                    <div className="form-group name">
                        <input value={this.state.name}
                               onChange={e => this.change(e)}
                               name="name"
                               className="form-control"
                               placeholder="Имя..."/>

                        <span className={"error-message " + (this.state.nameError === '' ? 'd-none' : '')}>{this.state.nameError}</span>
                    </div>
                    <div className="form-group phone">
                        <input value={this.state.phone}
                               onChange={e => this.change(e)}
                               name="phone"
                               className="form-control"
                               placeholder="Телефон..."/>

                        <span className={"error-message " + (this.state.phoneError === '' ? 'd-none' : '')}>{this.state.phoneError}</span>
                    </div>
                    <div className="form-group email">
                        <input value={this.state.email}
                               onChange={e => this.change(e)}
                               name="email"
                               className="form-control"
                               placeholder="E-mail..."/>

                        <span className={"error-message " + (this.state.emailError === '' ? 'd-none' : '')}>{this.state.emailError}</span>
                    </div>
                    <button onClick={(e) => this.onSubmit(e)} className="btn inverted"><a>отправить контакты</a></button>
                </div>
            </form>
        );
    }
}

export default Form;