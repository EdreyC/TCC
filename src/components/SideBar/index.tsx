import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { BiHome } from 'react-icons/bi';
import { HiViewBoards } from 'react-icons/hi';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <ProSidebar collapsed={collapsed}>
            <SidebarHeader >
                {collapsed &&
                    <MenuItem className='text-center' onClick={(e) => setCollapsed(!collapsed)}><AiOutlineRight /></MenuItem>
                }
                {!collapsed &&
                    <MenuItem className='text-center' onClick={(e) => setCollapsed(!collapsed)}><AiOutlineLeft /></MenuItem>
                }
            </SidebarHeader>
            <SidebarContent >
                <Menu iconShape="square">
                    <MenuItem icon={<BiHome />}><Link to='/'>Home</Link></MenuItem>
                    <SubMenu title="Board" icon={<HiViewBoards />}>
                        <MenuItem><Link to='/board'>Board</Link></MenuItem>
                        <MenuItem><Link to='/board'>Board</Link></MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </ProSidebar>
    )
}
export default SideBar;