import { FC } from 'react'
import classnames from 'classnames'
import { PaginationProps } from './Pagination.types'
import { usePagination, DOTS } from '../../hooks/usePagination'

import styles from './Pagination.module.css'

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    if (currentPage > totalCount / pageSize) return
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    if (currentPage < totalCount / pageSize) return
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul className={classnames(styles['pagination-container'], {})}>
      <li
        className={classnames(styles['pagination-item'], {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className={classnames(styles['arrow'], styles['left'])} />
      </li>
      {paginationRange.map((pageNumber: number, index: number) => {
        if (pageNumber === DOTS) {
          return (
            <li className={styles['pagination-item dots']} key={index}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={classnames(styles['pagination-item'], {
              [styles['selected']]: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={index}>
            {pageNumber}
          </li>
        )
      })}

      <li
        className={classnames(styles['pagination-item'], {
          [styles['disabled']]: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className={classnames(styles['arrow'], styles['right'])} />
      </li>
    </ul>
  )
}

export default Pagination
