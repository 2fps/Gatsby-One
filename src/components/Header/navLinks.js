import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const NavLinks = ({ menus }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        left: false,
    });
    const [open, setOpen] = React.useState(true);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function toggleClick(event) {
        event.stopPropagation();
        setOpen(!open);
    }

    // 开启或关闭抽屉
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            role="presentation"
            onClick={ toggleDrawer(side, false) }
            onKeyDown={ toggleDrawer(side, false) }
        >
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
            >
                {menus.map((list, ind) => {
                    let template = null;

                    if (list.children) {
                        let children = list.children;

                        template = (
                            <span key={ ind }>
                                <ListItem button onClick={ toggleClick }>
                                    {/* <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon> */}
                                    <ListItemText primary={ list.name } />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={ open } timeout="auto" unmountOnExit>
                                    <List disablePadding>
                                        {children.map((child, index) => {
                                            return (
                                                <ListItem component="a" href={ child.path } target="_blank" button key={ index }>
                                                    {/* <ListItemIcon>
                                                        <StarBorder />
                                                    </ListItemIcon> */}
                                                    <ListItemText primary={ child.name } />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            </span>
                        );
                    } else {
                        template = (
                            <ListItem component="a" href={ list.path } button key={ ind }>
                                <ListItemText primary={ list.name } />
                            </ListItem>
                        );

                    }

                    return template;
                })}
            </List>
        </div>
    );

    return (
        <div className="nav-licks">
            <div>
                <div className="nav-lists">
                    {menus.map((list, ind) => {
                        let template = null;

                        if (list.children) {
                            let children = list.children;

                            // 有子元素的菜单
                            template = (
                                <span key={ ind }>
                                    <Typography variant="inherit" gutterBottom className="margin-right-20px">
                                        <span onClick={ handleClick }>
                                            { list.name }
                                        </span>
                                    </Typography>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={ anchorEl }
                                        open={ Boolean(anchorEl) }
                                        onClose={ handleClose }
                                    >
                                        {children.map((child, index) => {
                                            return (
                                                <MenuItem onClick={ handleClose } key={ index }>
                                                    <a href={ child.path } target="_blank" rel="noopener noreferrer" onClick={ handleClick }>
                                                        { child.name }
                                                    </a>
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                </span>
                            );
                        } else {
                            // 单个的菜单
                            template = (
                                <Typography variant="inherit" gutterBottom className="margin-right-20px" key={ ind }>
                                    <a href={ list.path }>
                                        { list.name }
                                    </a>
                                </Typography>
                            );
                        }

                        return template;
                    })}
                </div>
                <Button onClick={ toggleDrawer('left', true) } className="list-button">
                    <MenuIcon />
                </Button>
            </div>
            <Drawer open={ state.left } onClose={ toggleDrawer('left', false) }>
                {sideList('left')}
            </Drawer>
        </div>
    )
}

export default NavLinks;
