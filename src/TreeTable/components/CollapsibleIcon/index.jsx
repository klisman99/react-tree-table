import classNames from 'classnames';

import './style.css';

export default function CollapsibleIcon({ collapsed, onClick }) {
    const classes = classNames('collapsible-icon',  {
        'collapsible-icon--collapsed': collapsed
    });

    return (
        <div
            className={classes}
            onClick={onClick}
        >{'>'}</div>
    );
}