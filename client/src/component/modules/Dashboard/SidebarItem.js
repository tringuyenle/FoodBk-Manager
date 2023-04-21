import './style.css';
function SidebarItem({onClick, title}) {
    return (
        <div onClick = {onClick} className = "sideItem_box mt-3">
            <div className = "title">{title}</div>
        </div>
    );
}

// Path: src/component/modules/Dashboard/SidebarItem.js
export default SidebarItem;