'use client'
import { IBenefitGetAll } from '@/models/Benefit'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
    useGetAllBenefitsQuery,
    useChangeStatusBenefitMutation,
    useUpdateBenefitMutation,
    useCreateBenefitMutation,
    useChangeStatusManyBenefitMutation
} from '@/services/BenefitService'
import {
    Box,
    Select,
    Pagination,
    Typography,
    MenuItem,
    SelectChangeEvent,
    Paper,
    Checkbox,
    TableRow,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableContainer,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    TableSortLabel,
    ListItemText,
    InputLabel,
    FormControl,
    FormControlLabel,
    Chip,
    RadioGroup,
    Radio,
    Divider,
    Collapse
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { CirclePlus, EyeIcon, Pencil, Trash2 } from 'lucide-react'
import AlertDialog from '@/components/AlertDialog'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'

import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/formatDate'
import { IAspNetRoleGetAll } from '@/models/AspNetRole'
import { useGetAllRolesQuery } from '@/services/AspNetRoleService'
import BenefitFilter from '../BenefitFilter'
import { useGetAllDepartmentQuery } from '@/services/DepartmentService'
import { IDepartmentGetAll } from '@/models/Department'

function BenefitPage() {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState('10')
    const [from, setFrom] = useState(1)
    const [to, setTo] = useState(10)
    const [keyword, setKeyword] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState<string | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<string>('')
    const [name, setName] = useState('')
    const [benefitContribution, setBenefitContribution] = useState<number>(0)
    const [benefitTypeId, setBenefitTypeId] = useState<number>(0)
    const [nameOfBenefitType, setNameOfBenefitType] = useState('')
    const [isChangeMany, setIsChangeMany] = useState(false)

    const [roles, setRoles] = useState<string[]>([])
    const { data: roleResponse, isLoading: isRoleLoading } = useGetAllRolesQuery()
    const role = (roleResponse?.Data?.Records as IAspNetRoleGetAll[]) || []

    const [departments, setDepartments] = useState<string[]>([])
    const { data: departmentResponse, isLoading: isBenefitTypesLoading } = useGetAllDepartmentQuery()
    const department = (departmentResponse?.Data?.Records as IDepartmentGetAll[]) || []

    const [gender, setGender] = useState<number | ''>('')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 26500000])

    const [isOpenRole, setIsOpenRole] = useState(false)
    const [isOpenDepartment, setIsOpenDepartment] = useState(false)

    const [isOpenGender, setIsOpenGender] = useState(false)
    // Hàm để toggle trạng thái hiển thị danh sách
    const toggleListRole = () => {
        setIsOpenRole(prevState => !prevState)
    }

    const toggleListDepartment = () => {
        setIsOpenDepartment(prevState => !prevState)
    }

    const toggleListGender = () => {
        setIsOpenGender(prevState => !prevState)
    }

    const handleSliderChange = (value: number | number[]) => {
        if (Array.isArray(value) && value.length === 2) {
            let [minValue, maxValue] = value

            // Đảm bảo rằng minValue không thể vượt qua maxValue hiện tại
            minValue = Math.min(minValue, priceRange[1])

            // Đảm bảo rằng maxValue không thể vượt qua minValue hiện tại
            maxValue = Math.max(maxValue, priceRange[0])

            // Cập nhật giá trị priceRange với giá trị min và max hợp lệ
            setPriceRange([minValue, maxValue])
        }
    }

    const [filter, setFilter] = useState<IFilterSysConfiguration>({
        pageSize: 10,
        pageNumber: 1
    })

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>, role: string) => {
        if (event.target.checked) {
            // Thêm role vào danh sách roles nếu checkbox được tích
            setRoles([...roles, role])
        } else {
            // Xóa role khỏi danh sách roles nếu checkbox bị bỏ tích
            setRoles(roles.filter(r => r !== role))
        }
    }

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>, department: string) => {
        if (event.target.checked) {
            // Thêm role vào danh sách roles nếu checkbox được tích
            setDepartments([...departments, department])
        } else {
            // Xóa role khỏi danh sách roles nếu checkbox bị bỏ tích
            setDepartments(departments.filter(r => r !== department))
        }
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
        // Nếu người dùng chọn, set gender, nếu bỏ chọn, set gender về '' (không chọn gì)
        if (gender === value) {
            setGender('') // Nếu đã chọn rồi, bỏ chọn
        } else {
            setGender(value) // Chọn giới tính mới
        }
    }

    const { data: responseData, isFetching, refetch } = useGetAllBenefitsQuery(filter)
    const [deleteBenefit, { isSuccess: isSuccessDelete }] = useChangeStatusBenefitMutation()
    //const [createBenefit, { isSuccess, isLoading, isError }] = useCreateBenefitMutation()
    //const [updateBenefit] = useUpdateBenefitMutation()
    const [isSuccess, setSuccess] = useState(false)
    const [
        changeManyBenefit,
        { isError: isErrorChangeMany, isSuccess: isSuccessChangeMany, isLoading: isLoadingChangeMany }
    ] = useChangeStatusManyBenefitMutation()

    const benefitData = responseData?.Data.Records as IBenefitGetAll[]
    const totalRecords = responseData?.Data.TotalRecords as number

    const isSelected = (id: string) => selected.includes(id)

    const handleCheckboxClick = (id: string) => {
        setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess])

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(benefitData.map(row => row.Id))
        } else {
            setSelected([])
        }
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
        setFilter(prev => {
            return {
                ...prev,
                pageNumber: newPage
            }
        })
    }

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        const newRowsPerPage = event.target.value as string
        setRowsPerPage(newRowsPerPage)
        setPage(1)
        setFilter(prev => ({
            ...prev,
            pageSize: Number(newRowsPerPage),
            pageNumber: 1
        }))
    }

    const handleSearchKeyword = () => {
        setPage(1)
        setFilter(prev => {
            return {
                ...prev,
                keyword: keyword,
                pageNumber: 1
            }
        })
    }

    useEffect(() => {
        if (!isFetching && responseData?.Data) {
            const from = (page - 1) * Number(rowsPerPage) + 1
            setFrom(from)

            const to = Math.min(page * Number(rowsPerPage), totalRecords)
            setTo(to)
        }
    }, [isFetching, responseData, page, rowsPerPage])

    useEffect(() => {
        refetch()
    }, [page, rowsPerPage, keyword])

    const handleDeleteClick = async (id: string) => {
        setOpenDialog(true)
        setSelectedRow(id)
    }

    const handleChangeManyClick = async () => {
        setIsChangeMany(true)
        setOpenDialog(true)
    }

    const handleChangeStatusManyBenefit = async () => {
        if (selected.length > 0) {
            await changeManyBenefit(selected)
            setIsChangeMany(false)
            setSelected([])
            setOpenDialog(false)
        }
    }

    const handleConfirmChangeMany = async () => {
        await handleChangeStatusManyBenefit()
        refetch()
    }

    const handleDeleteBenefit = async () => {
        if (selectedRow) {
            await deleteBenefit(selectedRow)
            if (isSelected(selectedRow)) {
                setSelected(prev => prev.filter(item => item !== selectedRow))
            }
            setOpenDialog(false)
            setSelectedRow(null)
        }
    }

    useEffect(() => {
        if (isSuccessDelete) {
            refetch()
        }
    }, [isSuccessDelete])

    const handleSort = (property: string) => {
        setFilter(prev => ({
            ...prev,
            sortBy: property,
            isDescending: orderBy === property && order === 'asc' ? true : false
        }))
        if (orderBy === property) {
            setOrder(order === 'asc' ? 'desc' : 'asc')
        } else {
            setOrder('asc')
        }
        setOrderBy(property)
    }

    const countRows = selected.length

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'calc(100% / 4 - 8px) calc(100% / 4 * 3 - 16px)',
                gap: '24px'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    scrollbarGutter: 'stable',
                    overflow: 'auto',
                    borderRadius: '5px',
                    backgroundColor: 'var(--background-color)',
                    '&::-webkit-scrollbar': {
                        width: '7px',
                        height: '7px',
                        backgroundColor: 'var(--background-color)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--scrollbar-color)',
                        borderRadius: '10px'
                    }
                }}
            >
                <Box
                    sx={{
                        margin: '10px',
                        '& fieldset': {
                            borderRadius: '8px',
                            color: 'var(--text-color)',
                            borderColor: 'var(--border-color)'
                        },
                        '& .MuiInputBase-root': {
                            paddingRight: '0px'
                        },
                        '& .MuiInputBase-input': {
                            paddingRight: '12px',
                            color: 'var(--text-color)',
                            fontSize: '16px',
                            '&::placeholder': {
                                color: 'var(--placeholder-color)',
                                opacity: 1
                            }
                        },
                        '& .MuiOutlinedInput-root:hover fieldset': {
                            borderColor: 'var(--hover-field-color)'
                        },
                        '& .MuiOutlinedInput-root.Mui-error:hover fieldset': {
                            borderColor: 'var(--error-color) !important' // Màu lỗi khi hover
                        },
                        '& .MuiOutlinedInput-root.Mui-error fieldset': {
                            borderColor: 'var(--error-color) !important' // Màu lỗi khi hover
                        },
                        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                            borderColor: 'var(--selected-field-color)'
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-label-color)'
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'var(--selected-field-color)'
                        },
                        '& .MuiInputLabel-root.Mui-error': {
                            color: 'var(--error-color)'
                        },
                        '& .MuiSelect-icon': {
                            color:
                                isSubmit && (!Array.isArray(roles) || roles.length === 0)
                                    ? 'var(--error-color)'
                                    : 'var(--text-color)'
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant='body1' sx={{ color: 'black', fontWeight: 'bold' }}>
                            Selected Roles:
                            <span style={{ color: 'green' }}>
                                {roles.join(', ')} {/* Hiển thị danh sách role đã chọn */}
                            </span>
                        </Typography>
                        <Box>
                            <Button
                                onClick={toggleListRole}
                                style={{
                                    borderRadius: '6px',
                                    color: 'black',
                                    padding: '4px 4px', // Thu nhỏ padding
                                    minWidth: 'auto'
                                }}
                                className={`
                                absolute ${isOpenRole ? 'right-3' : 'right-[21.5px]'}
                                bg-[var(--background-color)]
                                border border-[var(--border-color)]
                                hover:bg-[var(--hover-color)]
                                hover:border-[var(--hover-color)]`}
                            >
                                {isOpenRole ? <ChevronUp /> : <ChevronDown />}
                            </Button>
                        </Box>
                    </Box>

                    {/*
                    <Box sx={{ marginTop: '16px' }}>
                        {roles.map((roleItem, index) => (
                            <Chip key={index} label={roleItem} sx={{ marginRight: '8px', marginBottom: '8px' }} />
                        ))}
                    </Box>
                    */}
                    <Collapse in={isOpenRole} timeout='auto' unmountOnExit>
                        <Box sx={{ marginTop: '16px' }}>
                            {role.map(roleItem => (
                                <div key={roleItem.Id} style={{}}>
                                    <FormControlLabel
                                        key={roleItem.Id}
                                        control={
                                            <Checkbox
                                                checked={roles.includes(roleItem.Name)} // Kiểm tra xem role có trong danh sách roles không
                                                onChange={event => handleRoleChange(event, roleItem.Name)} // Xử lý thay đổi checkbox
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    '&.Mui-checked': {
                                                        color: 'var(--selected-color)'
                                                    }
                                                }}
                                            />
                                        }
                                        label={roleItem.Name}
                                        sx={{
                                            color: 'var(--text-color)',
                                            '& .MuiTypography-root': {
                                                fontSize: '16px'
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </Box>
                    </Collapse>
                </Box>
                <Divider sx={{ marginTop: '15px', marginBottom: '10px', borderColor: 'var(--border-color)' }} />

                <Box
                    sx={{
                        margin: '10px',
                        '& fieldset': {
                            borderRadius: '8px',
                            color: 'var(--text-color)',
                            borderColor: 'var(--border-color)'
                        },
                        '& .MuiInputBase-root': {
                            paddingRight: '0px'
                        },
                        '& .MuiInputBase-input': {
                            paddingRight: '12px',
                            color: 'var(--text-color)',
                            fontSize: '16px',
                            '&::placeholder': {
                                color: 'var(--placeholder-color)',
                                opacity: 1
                            }
                        },
                        '& .MuiOutlinedInput-root:hover fieldset': {
                            borderColor: 'var(--hover-field-color)'
                        },
                        '& .MuiOutlinedInput-root.Mui-error:hover fieldset': {
                            borderColor: 'var(--error-color) !important' // Màu lỗi khi hover
                        },
                        '& .MuiOutlinedInput-root.Mui-error fieldset': {
                            borderColor: 'var(--error-color) !important' // Màu lỗi khi hover
                        },
                        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                            borderColor: 'var(--selected-field-color)'
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-label-color)'
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'var(--selected-field-color)'
                        },
                        '& .MuiInputLabel-root.Mui-error': {
                            color: 'var(--error-color)'
                        },
                        '& .MuiSelect-icon': {
                            color:
                                isSubmit && (!Array.isArray(departments) || departments.length === 0)
                                    ? 'var(--error-color)'
                                    : 'var(--text-color)'
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant='body1' sx={{ color: 'black', fontWeight: 'bold' }}>
                            Selected Departments:
                            <span style={{ color: 'green' }}>
                                {departments.join(', ')} {/* Hiển thị danh sách role đã chọn */}
                            </span>
                        </Typography>
                        <Box>
                            <Button
                                onClick={toggleListDepartment}
                                style={{
                                    borderRadius: '6px',
                                    color: 'black',
                                    padding: '4px 4px', // Thu nhỏ padding
                                    minWidth: 'auto'
                                }}
                                className={`
                                absolute ${isOpenDepartment ? 'right-3' : 'right-[21.5px]'}
                                bg-[var(--background-color)]
                                border border-[var(--border-color)]
                                hover:bg-[var(--hover-color)]
                                hover:border-[var(--hover-color)]`}
                            >
                                {isOpenDepartment ? <ChevronUp /> : <ChevronDown />}
                            </Button>
                        </Box>
                    </Box>
                    {/*
                    <Box sx={{ marginTop: '16px' }}>
                        {roles.map((roleItem, index) => (
                            <Chip key={index} label={roleItem} sx={{ marginRight: '8px', marginBottom: '8px' }} />
                        ))}
                    </Box>
                    */}
                    <Collapse in={isOpenDepartment} timeout='auto' unmountOnExit>
                        <Box sx={{ marginTop: '16px' }}>
                            {department.map(department => (
                                <div key={department.Id} style={{}}>
                                    <FormControlLabel
                                        key={department.Id}
                                        control={
                                            <Checkbox
                                                checked={departments.includes(department.Name)} // Kiểm tra xem role có trong danh sách roles không
                                                onChange={event => handleDepartmentChange(event, department.Name)} // Xử lý thay đổi checkbox
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    '&.Mui-checked': {
                                                        color: 'var(--selected-color)'
                                                    }
                                                }}
                                            />
                                        }
                                        label={department.Name}
                                        sx={{
                                            color: 'var(--text-color)',
                                            '& .MuiTypography-root': {
                                                fontSize: '16px'
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </Box>
                    </Collapse>
                </Box>
                <Divider sx={{ marginTop: '15px', marginBottom: '10px', borderColor: 'var(--border-color)' }} />

                <Box sx={{ margin: '10px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant='body1' sx={{ color: 'black', fontWeight: 'bold' }}>
                            Selected Gender:
                            <span style={{ color: 'green' }}>
                                {gender === '' ? '' : gender === 1 ? 'Nam' : 'Nữ'}
                                {/* Hiển thị danh sách role đã chọn */}
                            </span>
                        </Typography>
                        <Box>
                            <Button
                                onClick={toggleListGender}
                                style={{
                                    borderRadius: '6px',
                                    color: 'black',
                                    padding: '4px 4px', // Thu nhỏ padding
                                    minWidth: 'auto'
                                }}
                                className={`
                                absolute ${isOpenGender ? 'right-3' : 'right-[21.5px]'}
                                bg-[var(--background-color)]
                                border border-[var(--border-color)]
                                hover:bg-[var(--hover-color)]
                                hover:border-[var(--hover-color)]`}
                            >
                                {isOpenGender ? <ChevronUp /> : <ChevronDown />}
                            </Button>
                        </Box>
                    </Box>
                    {/* Các checkbox để chọn giới tính */}
                    <Collapse in={isOpenGender} timeout='auto' unmountOnExit>
                        <Box sx={{ marginTop: '16px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={gender === 1} // Kiểm tra nếu gender là 1 (Nam)
                                            onChange={event => handleGenderChange(event, 1)} // Xử lý khi chọn Nam
                                            sx={{
                                                color: 'var(--text-color)',
                                                '&.Mui-checked': {
                                                    color: 'var(--selected-color)'
                                                }
                                            }}
                                        />
                                    }
                                    label='Nam'
                                    sx={{
                                        color: 'var(--text-color)'
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={gender === 0} // Kiểm tra nếu gender là 0 (Nữ)
                                            onChange={event => handleGenderChange(event, 0)} // Xử lý khi chọn Nữ
                                            sx={{
                                                color: 'var(--text-color)',
                                                '&.Mui-checked': {
                                                    color: 'var(--selected-color)'
                                                }
                                            }}
                                        />
                                    }
                                    label='Nữ'
                                    sx={{
                                        color: 'var(--text-color)'
                                    }}
                                />
                            </Box>
                        </Box>
                    </Collapse>
                </Box>
                <Divider
                    sx={{ margin: '10px', marginTop: '15px', marginBottom: '10px', borderColor: 'var(--border-color)' }}
                />

                <Box
                    sx={{
                        width: '100%',
                        //display: 'flex',
                        //justifyContent: 'center',
                        //display: 'flex',
                        //justifyContent: 'center',
                        //alignItems: 'center',
                        margin: '0px'
                    }}
                >
                    <Box>
                        <div style={{ padding: '10px', maxWidth: '600px', margin: '0 auto' }}>
                            <h2 style={{ fontWeight: 'bold' }}>Price range</h2>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <input
                                    type='number'
                                    value={priceRange[0]}
                                    min={0}
                                    max={100000000}
                                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    style={{ width: '45%', padding: '5px', textAlign: 'center' }}
                                />
                                <span style={{ margin: '0 10px' }}>-</span>
                                <input
                                    type='number'
                                    value={priceRange[1]}
                                    min={0}
                                    max={100000000}
                                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    style={{ width: '45%', padding: '5px', textAlign: 'center' }}
                                />
                            </div>
                            <Slider
                                range
                                min={0}
                                max={100000000}
                                step={1000}
                                value={priceRange}
                                onChange={handleSliderChange}
                                style={{ marginBottom: '20px' }}
                            />
                            <p>
                                Price from: <strong>{priceRange[0].toLocaleString()}đ</strong> to{' '}
                                <strong>{priceRange[1].toLocaleString()}đ</strong>
                            </p>
                        </div>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Paper
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '6px',
                        backgroundColor: 'var(--background-color)'
                    }}
                >
                    <Box display='flex' alignItems='center' justifyContent='space-between' margin='20px'>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <TextField
                                fullWidth
                                id='location-search'
                                type='search'
                                placeholder={t('COMMON.SYS_CONFIGURATION.PLACEHOLDER_SEARCH')}
                                variant='outlined'
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                sx={{
                                    color: 'var(--text-color)',
                                    padding: '0px',
                                    width: '335px',
                                    '& fieldset': {
                                        borderRadius: '8px',
                                        borderColor: 'var(--border-color)'
                                    },
                                    '& .MuiInputBase-root': { paddingRight: '0px' },
                                    '& .MuiInputBase-input': {
                                        padding: '11px 0 11px 14px',
                                        color: 'var(--text-color)',
                                        fontSize: '16px'
                                    },
                                    '& .MuiOutlinedInput-root:hover fieldset': {
                                        borderColor: 'var(--hover-color)'
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: 'var(--selected-color)'
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleSearchKeyword()
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={handleSearchKeyword}
                                                sx={{
                                                    backgroundColor: 'var(--button-color)',
                                                    borderRadius: '0 8px 8px 0',
                                                    padding: '10.5px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover-button-color)'
                                                    }
                                                }}
                                            >
                                                <SearchIcon sx={{ color: 'white' }} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='center' gap='20px'>
                            <Typography
                                sx={{
                                    color: 'red',
                                    whiteSpace: 'nowrap',
                                    visibility: countRows > 0 ? 'visible' : 'hidden'
                                }}
                            >
                                {t('COMMON.COUNT_ROWS_SELECTED', { countRows })}
                            </Typography>
                            <Button
                                variant='contained'
                                startIcon={<Trash2 />}
                                sx={{
                                    height: '44px',
                                    visibility: countRows > 0 ? 'visible' : 'hidden',
                                    backgroundColor: 'var(--button-color)',
                                    width: 'auto',
                                    padding: '0px 24px',
                                    '&:hover': {
                                        backgroundColor: 'var(--hover-button-color)'
                                    },
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    textTransform: 'none'
                                }}
                                onClick={() => handleChangeManyClick()}
                                //onClick={() => handleDeleteBenefit()}
                            >
                                {t('COMMON.BUTTON.DELETE')}
                            </Button>

                            <Button
                                variant='contained'
                                startIcon={<CirclePlus />}
                                sx={{
                                    height: '44px',
                                    backgroundColor: 'var(--button-color)',
                                    width: 'auto',
                                    padding: '0px 24px',
                                    '&:hover': {
                                        backgroundColor: 'var(--hover-button-color)'
                                    },
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    textTransform: 'none'
                                }}
                                onClick={() => router.push('/admin/benefit/create-benefit')}
                                //onClick={() => handleOpenCreateDialog()}
                            >
                                {t('COMMON.BUTTON.CREATE')}
                            </Button>
                        </Box>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'var(--header-color-table)' }}>
                                    <TableCell
                                        padding='checkbox'
                                        sx={{ borderColor: 'var(--border-color)', paddingLeft: '8.5px' }}
                                    >
                                        <Checkbox
                                            indeterminate={selected.length > 0 && selected.length < benefitData.length}
                                            checked={
                                                benefitData && selected.length > 0
                                                    ? selected.length === benefitData.length
                                                    : false
                                            }
                                            onChange={handleSelectAllClick}
                                            sx={{
                                                color: 'var(--text-color)'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{ borderColor: 'var(--border-color)', minWidth: '49px', maxWidth: '60px' }}
                                    >
                                        <TableSortLabel
                                            active={'Id' === orderBy}
                                            direction={orderBy === 'Id' ? order : 'asc'}
                                            onClick={() => handleSort('Id')}
                                            sx={{
                                                '& .MuiTableSortLabel-icon': {
                                                    color: 'var(--text-color) !important'
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ID
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'BenefitTypeName'}
                                            direction={orderBy === 'BenefitTypeName' ? order : 'asc'}
                                            onClick={() => handleSort('BenefitTypeName')}
                                            sx={{
                                                '& .MuiTableSortLabel-icon': {
                                                    color: 'var(--text-color) !important'
                                                },
                                                width: '200px'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.BENEFIT.TYPE_NAME')} {/* Cập nhật khóa dịch này */}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                        sx={{ borderColor: 'var(--border-color)', minWidth: '49px', maxWidth: '60px' }}
                                    >
                                        <TableSortLabel
                                            active={orderBy === 'Name'}
                                            direction={orderBy === 'Name' ? order : 'asc'}
                                            onClick={() => handleSort('Name')}
                                            sx={{
                                                '& .MuiTableSortLabel-icon': {
                                                    color: 'var(--text-color) !important'
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.BENEFIT.NAME')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'BenefitContribution'}
                                            direction={orderBy === 'BenefitContribution' ? order : 'asc'}
                                            onClick={() => handleSort('BenefitContribution')}
                                            sx={{
                                                '& .MuiTableSortLabel-icon': {
                                                    color: 'var(--text-color) !important'
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.BENEFIT.CONTRIBUTION')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>

                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'CreatedDate' === orderBy}
                                            direction={orderBy === 'CreatedDate' ? order : 'asc'}
                                            onClick={() => handleSort('CreatedDate')}
                                            sx={{
                                                '& .MuiTableSortLabel-icon': {
                                                    color: 'var(--text-color) !important'
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SYS_CONFIGURATION.CREATED_DATE')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'CreatedBy'}
                                            direction={orderBy === 'CreatedBy' ? order : 'asc'}
                                            onClick={() => handleSort('CreatedBy')}
                                            sx={{
                                                '& .MuiTableSortLabel-icon': {
                                                    color: 'var(--text-color) !important'
                                                },
                                                width: '150px'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('Người tạo')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                textAlign: 'center',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                width: '150px'
                                            }}
                                        >
                                            {t('COMMON.BENEFIT.ACTION')}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {benefitData?.map(row => (
                                    <TableRow key={row.Id} selected={isSelected(row.Id)}>
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                checked={isSelected(row.Id)}
                                                onChange={() => handleCheckboxClick(row.Id)}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{row.Id}</TableCell>
                                        <TableCell sx={{ width: '200px' }}>{row.NameOfBenefitType}</TableCell>
                                        <TableCell>{row.Name}</TableCell>
                                        <TableCell>{row.BenefitContribution}</TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {formatDate(row.CreatedDate)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ width: '100px' }}>{row.CreatedBy}</TableCell>
                                        <TableCell>
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='space-between'
                                                gap='10px'
                                                width={'150px'}
                                            >
                                                <Tooltip title={t('COMMON.BUTTON.VIEW_DETAIL')}>
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='center'
                                                        sx={{
                                                            cursor: 'pointer',
                                                            color: '#00d100',
                                                            borderRadius: '50%',
                                                            width: '42px',
                                                            height: '42px',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--hover-color)'
                                                            }
                                                        }}
                                                    >
                                                        <EyeIcon />
                                                    </Box>
                                                </Tooltip>
                                                <Tooltip title={t('COMMON.BUTTON.EDIT')}>
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='center'
                                                        sx={{
                                                            cursor: 'pointer',
                                                            color: '#00d4ff',
                                                            borderRadius: '50%',
                                                            width: '42px',
                                                            height: '42px',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--hover-color)'
                                                            }
                                                        }}
                                                        //onClick={() => handleUpdate(row)}
                                                    >
                                                        <Pencil />
                                                    </Box>
                                                </Tooltip>
                                                <Tooltip title={t('COMMON.BUTTON.DELETE')}>
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='center'
                                                        sx={{
                                                            cursor: 'pointer',
                                                            color: 'red',
                                                            borderRadius: '50%',
                                                            width: '42px',
                                                            height: '42px',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--hover-color)'
                                                            }
                                                        }}
                                                        onClick={() => handleDeleteClick(row.Id)}
                                                    >
                                                        <Trash2 />
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box display='flex' alignItems='center' justifyContent='space-between' padding='15px'>
                        <Box display='flex' alignItems='center'>
                            <Typography sx={{ mr: '10px' }}>{t('COMMON.PAGINATION.ROWS_PER_PAGE')}</Typography>
                            <Select
                                id='select'
                                sx={{
                                    width: '71px',
                                    padding: '5px',
                                    color: 'var(--text-color)',
                                    '& .MuiSelect-icon': {
                                        color: 'var(--text-color)'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--border-color)'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--hover-color)'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--selected-color)'
                                    },
                                    '& .MuiSelect-select': {
                                        padding: '6px 32px 6px 10px'
                                    }
                                }}
                                value={rowsPerPage}
                                defaultValue='5'
                                onChange={handleChangeRowsPerPage}
                                MenuProps={{
                                    PaperProps: {
                                        elevation: 0,
                                        sx: {
                                            border: '1px solid var(--border-color)',
                                            '& .MuiList-root': {
                                                backgroundColor: 'var(--background-color)',
                                                padding: '5px',
                                                '& .MuiMenuItem-root': {
                                                    color: 'var(--text-color)',
                                                    borderRadius: '4px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover-color)'
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: 'var(--selected-color)'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }}
                            >
                                {[1, 2, 3, 4, 5, 10, 20, 30, 40].map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Typography sx={{ ml: '30px' }}>
                                {t('COMMON.PAGINATION.FROM_TO', { from, to, totalRecords })}
                            </Typography>
                        </Box>
                        <Pagination
                            count={Math.ceil(totalRecords / Number(rowsPerPage))}
                            page={page}
                            onChange={handleChangePage}
                            boundaryCount={1}
                            siblingCount={2}
                            variant='outlined'
                            sx={{
                                color: 'var(--text-color)',
                                borderColor: 'var(--border-color)',
                                '& .MuiPaginationItem-root': {
                                    color: 'var(--text-color)',
                                    borderColor: 'var(--border-color)',
                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--selected-color)',
                                        color: 'var(--text-color)'
                                    },
                                    '&:hover': {
                                        backgroundColor: 'var(--hover-color)',
                                        borderColor: 'var(--hover-color)'
                                    }
                                }
                            }}
                            color='primary'
                        />
                    </Box>
                </Paper>

                <AlertDialog
                    title={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.TITLE')}
                    content={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CONTENT')}
                    type='warning'
                    open={openDialog}
                    setOpen={setOpenDialog}
                    buttonCancel={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CANCEL')}
                    buttonConfirm={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.DELETE')}
                    onConfirm={() => (isChangeMany ? handleConfirmChangeMany() : handleDeleteBenefit())}
                />
            </Box>
        </Box>
    )
}

export default BenefitPage
