import { TableCell, Typography } from '@mui/material'
import { memo, useCallback } from 'react'
import { IFunctions } from '@/models/TablePermissionModel'
import { getDataPermissionByParentSelector, tablePermissionSlice } from '@/redux/slices/tablePermissionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface Props {
    id: number
    keyName: keyof IFunctions
}

let elementHoverSelectors: NodeListOf<Element> | any[] = []

function TableCellLabel({ id, keyName }: Props) {
    const dataSelectorCol = useSelector((state: RootState) => getDataPermissionByParentSelector(state, id, keyName))
    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
        dispatch(
            tablePermissionSlice.actions.updateDataByCheckAll({
                keyName,
                value: !dataSelectorCol.allow,
                parentId: id
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSelectorCol.allow, dispatch, id, keyName])

    const handleMouseOver = () => {
        if (keyName === 'IsAllowAll') {
            elementHoverSelectors = []

            dataSelectorCol.ids.map(id => {
                elementHoverSelectors = [
                    ...Array.from(elementHoverSelectors),
                    ...Array.from(document.querySelectorAll(`[data-hover^="${id}_"]`))
                ]
            })
        } else {
            elementHoverSelectors = dataSelectorCol.ids.map(id => {
                return document.querySelector(`[data-hover^="${id}_${keyName}"]`)
            })
        }

        if (elementHoverSelectors) {
            elementHoverSelectors.forEach(element => {
                // @ts-ignore
                const el = element as HTMLElement
                el.style.background = 'rgb(33 213 54 / 15%)'
            })
        }
    }

    const handleMouseLeave = () => {
        if (elementHoverSelectors) {
            elementHoverSelectors.forEach(element => {
                element?.removeAttribute('style')
            })
        }
    }

    return (
        <TableCell
            size='small'
            align='center'
            sx={{
                maxWidth: 100,
                minWidth: 100,
                paddingLeft: 1,
                paddingRight: 1,
                cursor: 'pointer',
                '&:hover': {
                    background: 'rgb(33 213 54 / 15%)'
                }
            }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <Typography p={1}>{dataSelectorCol.allow ? 'Bỏ hết' : 'Chọn hết'}</Typography>
        </TableCell>
    )
}

export default memo(TableCellLabel)
