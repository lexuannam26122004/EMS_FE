import { Box, Button, CircularProgress, Modal, Paper, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { Close, ContentSaveEditOutline } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetJsonRoleHasFunctionsQuery, useUpdateJsonRoleHasFunctionsMutation } from '@/services/AspNetRoleService'
import { useGetAllFunctionsQuery } from '@/services/SysFunctionService'
import { useToast } from '@/hooks/useToast'
import { useSelector, useDispatch } from 'react-redux'
import TablePermission from '@/components/TablePermission'
import { tablePermissionSlice, getPermissionForRoleSelector } from '@/redux/slices/tablePermissionSlice'

interface Props {
    data: any
    open: boolean
    onClose: () => void
}

function PermissionForRoleModal({ data, open, onClose }: Props) {
    const toast = useToast()

    const { t } = useTranslation('common')
    const { data: sysFunctionData, isLoading: isSysFunctionDataLoading } = useGetAllFunctionsQuery()
    const {
        data: jsonRoleData,
        isLoading: isJsonRoleDataLoading,
        refetch: refetchJsonRoleData
    } = useGetJsonRoleHasFunctionsQuery(data?.Id)
    const [updateJsonRole, resultUpdateRoleMutation] = useUpdateJsonRoleHasFunctionsMutation()
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const dataPermission = useSelector(getPermissionForRoleSelector)

    const dispatch = useDispatch()

    const handleClose = () => {
        onClose()
    }

    // Hàm async đảm bảo dispatch xong dữ liệu
    const loadData = async () => {
        if (sysFunctionData?.Data?.Records) {
            await dispatch(tablePermissionSlice.actions.addDefaultData(sysFunctionData.Data.Records))
        }
        if (jsonRoleData?.Data?.JsonRoleHasFunctions) {
            await dispatch(tablePermissionSlice.actions.addRoleData(jsonRoleData.Data.JsonRoleHasFunctions))
        }
        setIsDataLoaded(true)
    }

    useEffect(() => {
        if (!isSysFunctionDataLoading && !isJsonRoleDataLoading) {
            loadData()
        }
    }, [isSysFunctionDataLoading, isJsonRoleDataLoading, sysFunctionData, jsonRoleData])

    const handleSave = async () => {
        try {
            await updateJsonRole({
                Id: data?.Id,
                JsonRoleHasFunctions: JSON.stringify(dataPermission)
            })
        } catch (err) {
            console.log(t('COMMON.PERMISSIONS.MESSAGE.ERROR.UPDATE_PERMISSION'))
        }
    }

    useEffect(() => {
        if (resultUpdateRoleMutation.isSuccess) {
            toast(t('COMMON.PERMISSIONS.MESSAGE.SUCCESS.UPDATE_PERMISSION'), 'success')
            refetchJsonRoleData()
        }
        if (resultUpdateRoleMutation.isError) {
            toast(t('COMMON.PERMISSIONS.MESSAGE.ERROR.UPDATE_PERMISSION'), 'error')
        }
    }, [resultUpdateRoleMutation])

    return (
        <Modal open={open} sx={{ padding: 10 }} onClose={handleClose}>
            <Paper
                sx={{
                    width: '90vw',
                    maxWidth: '1200px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'var(--background-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px'
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        paddingInline: 4,
                        paddingBlock: 2,
                        borderWidth: '0px',
                        height: '90vh',
                        borderStyle: 'solid',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box sx={{ paddingBottom: 2 }}>
                        <Typography
                            variant='h5'
                            sx={{ fontWeight: 'Bold', color: 'var(--text-color)', textAlign: 'center' }}
                        >
                            {t('COMMON.PERMISSIONS.TABS.PERMISSION_FOR_ROLE')}
                        </Typography>
                        <Typography
                            variant='h5'
                            sx={{ color: 'var(--text-role-color)', fontWeight: 'Bold', textAlign: 'center' }}
                        >
                            {data?.Name}
                        </Typography>
                    </Box>

                    {!isDataLoaded ? (
                        <Grid2 container justifyContent={'center'} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid2>
                    ) : (
                        <TablePermission height='100%' sx={{ flexGrow: '1', overflowY: 'auto' }} />
                    )}

                    <Grid2 sx={{ marginTop: '18px' }} container justifyContent={'center'} gap={5}>
                        <Button
                            size='medium'
                            type='button'
                            variant='outlined'
                            sx={{
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-color)',
                                '&:hover': {
                                    borderColor: 'var(--hover-color)',
                                    backgroundColor: 'var(--hover-color)'
                                }
                            }}
                            startIcon={<ContentSaveEditOutline />}
                            onClick={handleSave}
                        >
                            {t('COMMON.BUTTON.SAVE')}
                        </Button>
                        <Button
                            size='medium'
                            type='button'
                            variant='outlined'
                            sx={{
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-color)',
                                '&:hover': {
                                    borderColor: 'var(--hover-color)',
                                    backgroundColor: 'var(--hover-color)'
                                }
                            }}
                            startIcon={<Close />}
                            onClick={handleClose}
                        >
                            {t('COMMON.BUTTON.CANCEL')}
                        </Button>
                    </Grid2>
                </Box>
            </Paper>
        </Modal>
    )
}

export default PermissionForRoleModal
