import { Container, Nav } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart } from "react-icons/fa"

const SideBar = () => {
    return (
        <ProSidebar>
            <SidebarHeader>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<FaHeart />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </ProSidebar>
    )
}
export default SideBar;