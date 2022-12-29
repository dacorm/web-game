import styles from './Profile.module.css'
import userLogo from '../../assets/img/SomeUser.jpg'
import { BiPencil, BiLogOut } from 'react-icons/all'
import { useState } from 'react'
import { ProfileEdit } from '../../components/ProfileEdit/ProfileEdit'
import Modal from '../../shared/ui/Modal'
import ProfileDataTable from '../../components/ProfileDataTable'
import { ProfileFormPass } from '../../components/ProfileFormPass/ProfileFormPass'
import PageHeader from '../../shared/ui/PageHeader'
import ProfileFormAvatar from '../../components/ProfileFormAvatar'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [modal, Setmodal] = useState(false)
  const [editLogo, SeteditLogo] = useState(false)
  const [editPas, SeteditPas] = useState(false)

  const mouseOverHandler = () => SeteditLogo(true)
  const mouseOutHandler = () => SeteditLogo(false)
  const onOpen = () => Setmodal(true)

  const onClose = () => {
    Setmodal(false)
    SeteditPas(false)
    SeteditLogo(false)
  }

  const editPasHandler = () => {
    SeteditPas(true)
    onOpen()
  }

  const editLogoHandler = () => {
    SeteditLogo(true)
    onOpen()
  }


  return (
    <>
      <PageHeader pageName='Профиль' />
      <div className={styles.profile}>
        <div className={styles.avatarBlock}>
          <img className={styles.avatar}
               alt="userLogo"
               src={userLogo} onMouseOver={mouseOverHandler}
               onMouseOut={mouseOutHandler} />
          {editLogo && <ProfileEdit />}
        </div>
        <div className={styles.userDataBlock}>
          <div className={styles.userName}>UserName</div>
          <ProfileDataTable points={999} games={10} rating={4}/>
          <div className={styles.actionBlock}>
            <p>
              <Link onClick={editPasHandler} to={"#"}>
                <BiPencil /> Изменить пароль
              </Link>
            </p>
            <p>
              <Link onClick={editLogoHandler} to={"#"}>
                <BiPencil /> Изменить аватар
              </Link>
            </p>
            <p><Link to={"#"}><BiLogOut /> Выйти </Link></p>
          </div>
        </div>
      </div>

      {modal && editPas && <Modal title='Изменение пароля' onClose={onClose}>
        <ProfileFormPass/>
      </Modal>
      }
      {modal && editLogo && <Modal title='Изменение аватара' onClose={onClose}>
        <ProfileFormAvatar/>
      </Modal>
      }

    </>

  )
};
