import PropTypes from 'prop-types';
// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra, icon: IconComp }) {
  return (
    <MainCard contentSX={{ p: 2.5 }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        {IconComp && (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: `${color}.lighter`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <IconComp style={{ fontSize: '1.25rem' }} />
          </Box>
        )}
      </Stack>

      <Grid container sx={{ alignItems: 'center', mb: 1 }}>
        <Grid>
          <Typography variant="h3" color="inherit" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {count}
          </Typography>
        </Grid>
        {percentage && (
          <Grid>
            <Chip
              variant="combined"
              color={isLoss ? 'error' : 'success'}
              icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          </Grid>
        )}
      </Grid>

      <Typography variant="caption" color="text.secondary">
        Extra:{' '}
        <Typography component="span" variant="caption" sx={{ color: `${color}.main`, fontWeight: 600 }}>
          {extra}
        </Typography>{' '}
        este año
      </Typography>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  icon: PropTypes.elementType
};
