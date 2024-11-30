'use client'

import React, { useState } from 'react'
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert
} from '@mui/material'
import { IHolidayGetAll, IHolidayCreate } from '@/models/Holiday'
import {
    useGetAllHolidaysQuery,
    useCreateHolidayMutation,
    useDeleteHolidayMutation,
    useUpdateHolidayMutation
} from '@/services/HolidayService'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

const HolidayPage = () => {
    const { data: holidayResponse, isLoading: loading, error: holidayError } = useGetAllHolidaysQuery()
    const [createHoliday, { isLoading: isCreating, error: createError }] = useCreateHolidayMutation()
    const [deleteHoliday, { isLoading: isDeleting, error: deleteError }] = useDeleteHolidayMutation()
    const handleCreate = async () => {}
    const handleDelete = async () => {}
}

export default HolidayPage
