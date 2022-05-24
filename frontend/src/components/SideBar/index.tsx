import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiHome } from 'react-icons/bi';
import { HiViewBoards } from 'react-icons/hi';
import { query, collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import logo from '../../img/Agilie.it.png';

type Data = {
    id: string;
    name: string;
    owner: string
}

const SideBar = ({ ...props }) => {
    const [data, setData] = useState<Data[]>([]);
    const [dataId, setDataId] = useState<String[]>([]);

    async function getData() {
        const q = query(collection(db, "Projects"));
        const datadocs = await getDocs(q);
        setData(datadocs.docs.map(item => item.data() as Data));
        let idArrays: any[] = [];
        datadocs.docs.map(item => idArrays.push(item.id));
        setDataId(idArrays)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <ProSidebar collapsed={props.collapsed} className="fixed-left">
            <SidebarHeader>
                <div className='text-center'>
                    <img src={logo} className='img-fluid px-1' onClick={(e) => props.setCollapsed(!props.collapsed)} />
                    Agilize.it
                </div>
            </SidebarHeader>
            <SidebarContent >
                <Menu iconShape="square">
                    <MenuItem icon={<BiHome />}><Link to='/'>Home</Link></MenuItem>
                    <SubMenu title="Board" icon={<HiViewBoards />}>
                        {
                            data.map((item, index) => (
                                <MenuItem key={index}><Link to={'/board/' + dataId[index]}>{item.name}</Link></MenuItem>
                            ))
                        }
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>

            </SidebarFooter>
        </ProSidebar>
    )
}

export default SideBar;
