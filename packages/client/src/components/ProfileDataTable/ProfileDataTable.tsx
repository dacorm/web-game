import styles from './ProfileDataTable.module.css'
import React from 'react'

interface ProfileDataTableProps{
  points: number
  games: number
  rating:number
}


export const ProfileDataTable: React.FC<ProfileDataTableProps>=({points, games, rating}:ProfileDataTableProps)=>{
  return (
    <table className={styles.DataTable}>
      <tr>
        <td>Количество баллов</td>
        <td className={styles.dataTd}>{points}</td>
      </tr>
      <tr>
        <td>Количество игр</td>
        <td className={styles.dataTd}>{games}</td>
      </tr>
      <tr>
        <td>Место в рейтинге</td>
        <td className={styles.dataTd}>{rating}</td>
      </tr>
    </table>
  )
}