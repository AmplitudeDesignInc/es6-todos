
/**
 * While looking through this file, you will see a number of single-line comments
 * that begin with "TOPIC". These are to help you identify some of the places the
 * new ES6 features are coming into play. Thesae comments will always include a
 * link to a useful blog post or piece of documentation on the topic.
 */

/**
 * This is the primary resource for this system. It allows users to create
 * simple TODO items and store them using the base functionality created in
 * the Resource class. Refer to that super class for most functions.
 *
 * @type {Todo}
 */

// TOPIC: ES6 Classes (Subclasses) (http://2ality.com/2015/02/es6-classes-final.html)
window.Todo = class Todo extends Resource {

    constructor(text = '', dueDate) {
        // TOPIC: ES6 Classes (Calling super constructor) (http://2ality.com/2015/02/es6-classes-final.html)
        super();

        this._resourceName = 'Todo';

        this.text = text;
        this.isComplete = false;

        const tzOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
        let dueDateTs = (new Date(dueDate)).getTime() + tzOffset;
        if (Number.isNaN(dueDateTs)) {
            this._dueDate = Date.now() + 86400000; // default to tomorrow
        } else {
            this._dueDate = dueDateTs;
        }
    }

    get dueDate() {
        // TOPIC: Internationalization (dates) (http://es6-features.org/#DateTimeFormatting)
        let dateFormatter = new Intl.DateTimeFormat('en-US');
        return dateFormatter.format(new Date(this._dueDate));
    }

    validate() {
        // TOPIC: ES6 Classes (Calling super methods) (http://2ality.com/2015/02/es6-classes-final.html)
        let error = super.validate();
        if (error) {
            return error;
        }
        if (!this.text) {
            return new Error('Unable to save Todo without text');
        }
        if (!this.dueDate) {
            return new Error('Unable to save Todo without due date');
        }
    }

    render() {
        // TOPIC: String templates (http://2ality.com/2015/01/es6-strings.html)
        return `<li class='${ (this.isComplete) ? "completed" : "" }'>
            <button class='check'></button>
            <button class='delete'>✗</button>
            <p>${this.text}</p>
            <time>${this.dueDate}</time>
        </li>`;
    }

    serialize() {
        let data = super.serialize();
        data.text = this.text;
        data.isComplete = this.isComplete;
        data._dueDate = this._dueDate;
        return data;
    }

    static get(id = null) {
        // TOPIC: ES6 Classes (Super calls to static parent methods) (http://2ality.com/2015/02/es6-classes-final.html)
        return super.get(id, 'Todo');
    }

};
