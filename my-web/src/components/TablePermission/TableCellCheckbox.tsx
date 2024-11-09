import { Checkbox, TableCell } from '@mui/material'
import { memo, useCallback } from 'react'
import { IFunctions } from '@/models/TablePermissionModel'
import { tablePermissionSlice } from '@/redux/slices/tablePermissionSlice'
import { useDispatch } from 'react-redux'

interface Props {
    checked?: boolean
    keyName: keyof IFunctions
    id: number
}

let elementHoverSelectors: NodeListOf<Element> | any[] = []

function TableCellCheckbox({ id, checked, keyName }: Props) {
    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
        const functionChange =
            keyName === 'IsAllowAll'
                ? {
                      IsAllowAll: !checked,
                      IsAllowView: !checked,
                      IsAllowEdit: !checked,
                      IsAllowCreate: !checked,
                      IsAllowPrint: !checked,
                      IsAllowDelete: !checked
                  }
                : { [keyName]: !checked }

        const changeData = { id: id, data: functionChange }
        dispatch(tablePermissionSlice.actions.updateDataByCheckBox({ value: changeData }))
    }, [checked, dispatch, id, keyName])

    const handleMouseOver = () => {
        if (keyName === 'IsAllowAll') {
            elementHoverSelectors = document.querySelectorAll(`[data-hover^="${id}_"]`)
            if (elementHoverSelectors) {
                elementHoverSelectors.forEach(element => {
                    ;(element as HTMLElement).style.background = 'rgb(33 213 54 / 15%)'
                })
            }
        }
    }

    const handleMouseLeave = () => {
        if (elementHoverSelectors) {
            elementHoverSelectors.forEach(element => {
                element.removeAttribute('style')
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
            data-hover={id + '_' + keyName}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <Checkbox sx={{ padding: 1 }} checked={checked} />
        </TableCell>
    )
}

export default memo(TableCellCheckbox)