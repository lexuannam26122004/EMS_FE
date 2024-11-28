import { Box } from '@mui/material'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import './ImageGrid.css'

interface ImageGridProps {
    images: string[]
}

export default function ImageGrid({ images }: ImageGridProps) {
    const [openLightbox, setOpenLightbox] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index)
        setOpenLightbox(true)
    }

    const renderImages = () => {
        switch (images.length) {
            case 1:
                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '400px', // hoặc tùy chỉnh chiều cao
                            position: 'relative'
                        }}
                        onClick={() => handleImageClick(0)}
                    >
                        <img
                            src={images[0]}
                            alt='Single image'
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                )

            case 2:
                return (
                    <Box sx={{ display: 'grid', gap: 0.5, gridTemplateRows: '1fr 1fr' }}>
                        {images.map((img, index) => (
                            <Box
                                key={index}
                                sx={{
                                    height: '200px',
                                    position: 'relative'
                                }}
                                onClick={() => handleImageClick(index)}
                            >
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                )

            case 3:
                return (
                    <Box sx={{ display: 'grid', gap: 0.5, gridTemplateRows: '1fr auto' }}>
                        <Box
                            sx={{
                                height: '300px',
                                position: 'relative'
                            }}
                            onClick={() => handleImageClick(0)}
                        >
                            <img
                                src={images[0]}
                                alt='Top image'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {images.slice(1).map((img, index) => (
                                <Box
                                    key={index + 1}
                                    sx={{
                                        height: '150px',
                                        position: 'relative'
                                    }}
                                    onClick={() => handleImageClick(index + 1)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 2}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )

            case 4:
                return (
                    <Box sx={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 0.5 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {images.slice(0, 2).map((img, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: '200px',
                                        position: 'relative'
                                    }}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {images.slice(2).map((img, index) => (
                                <Box
                                    key={index + 2}
                                    sx={{
                                        height: '200px',
                                        position: 'relative'
                                    }}
                                    onClick={() => handleImageClick(index + 2)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 3}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )

            default: // 5 ảnh trở lên
                return (
                    <Box sx={{ display: 'grid', gap: 0.5, gridTemplateRows: 'auto 1fr' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                            {images.slice(0, 2).map((img, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: '200px',
                                        position: 'relative'
                                    }}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0.5 }}>
                            {images.slice(2, 5).map((img, index) => (
                                <Box
                                    key={index + 2}
                                    sx={{
                                        height: '150px',
                                        position: 'relative'
                                    }}
                                    onClick={() => handleImageClick(index + 2)}
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 3}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    {index === 2 && images.length > 5 && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            +{images.length - 5}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )
        }
    }

    return (
        <Box
            sx={{
                width: 'auto',
                height: 'auto',
                marginTop: 1,
                marginBottom: 1.1,
                marginLeft: -1,
                marginRight: -2
            }}
        >
            {renderImages()}

            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                slides={images.map(src => ({ src }))}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio: 5, // Giảm từ 5 xuống 2
                    zoomInMultiplier: 1.5,
                    doubleTapDelay: 300, // Delay cho double tap zoom
                    doubleClickDelay: 300, // Delay cho double click zoom
                    wheelZoomDistanceFactor: 100, // Tốc độ zoom khi dùng chuột (càng nhỏ càng nhanh)
                    pinchZoomDistanceFactor: 100 // Tốc độ zoom khi pinch trên mobile
                }}
                index={selectedImageIndex}
            />
        </Box>
    )
}
