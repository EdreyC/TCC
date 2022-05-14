import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiHome } from 'react-icons/bi';
import { HiViewBoards } from 'react-icons/hi';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { query, collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

type Data = {
    id:string;
    name: string;
    owner: string
}
  
const SideBar = () => {
    const [collapsed, setCollapsed] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [dataId,setDataId] = useState([]);

    async function getData() {
        const q = query(collection(db, "Projects"));
        const datadocs = await getDocs(q);
        // console.log(datadocs.docs.map((doc) => ({ ...doc.data()})))
        // setData(datadocs.docs.map(item =>{item.data()}))
        // console.log(datadocs.docs);
        setData(datadocs.docs.map(item => item.data() as Data));
        let idArrays = [];
        idArrays =datadocs.docs.map(item=>{item.id}); 
        setDataId(idArrays)

      }
    
      useEffect(() => {
        getData();
      }, [])

    return (
        <ProSidebar collapsed={collapsed} className="fixed-left">
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
                        {
                            data.map(item=>(
                                <MenuItem key={item.name}><Link to={'/board/' + dataId}>{item.name}</Link></MenuItem>
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
