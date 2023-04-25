import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import useData from '../../admin/components/hook/useData';

function Feed() {
    const { authState } = useData();
    return (
        <Box mt={10} flex={4} p={2}>
            <Box sx={{ padding: { xs: '1.25rem 2rem 0 2rem', sm: '3.75rem 6rem 0 6rem' } }}>
                <Typography sx={{ color: "white", fontSize: { xs: 40, sm: 100 }, fontWeight: 900 }}>ภาพยนตร์ รายการทีวี และความบันเทิงอีกมากมายแบบไม่จำกัด</Typography>
                <Typography sx={{ color: "white", fontSize: { xs: 16, sm: 40 }, fontWeight: 900 }}>รับชมได้ทุกที่ ยกเลิกได้ทุกเมื่อ</Typography>
                <Typography sx={{ color: "white", fontSize: { xs: 14, sm: 20 }, fontWeight: 900 }}>
                    หากพร้อมรับชม มาเป็นสมาชิกเพื่อครอบครัวของเรา
                </Typography>
                <Button variant='contained' color='error' sx={{size:{xs:'small',sm:'large'}}}>สมัครสมาชิก</Button>
            </Box>
        </Box>
    )
}

export default Feed
