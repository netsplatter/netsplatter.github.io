import React from "react";

const Form = (props) => (
    <form className="container-fluid contact-form" action="">
        <div className="wrapper clearfix">
            <h3>Всегда готовы к сотрудничеству</h3>
            <div className="form-group name">
                <input required="required" type="text" name="name" className="form-control"
                       placeholder="Имя..."/>
            </div>
            <div className="form-group phone">
                <input required="required" type="text" name="phone" className="form-control"
                       placeholder="Телефон..."/>
            </div>
            <div className="form-group email">
                <input required="required" type="text" name="email" className="form-control"
                       placeholder="E-mail..."/>
            </div>
            <button type="submit" className="btn inverted"><a>отправить контакты</a></button>
        </div>
    </form>
);

export default Form;