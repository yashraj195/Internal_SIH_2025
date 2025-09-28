import { List, ListItem, ListItemText, Chip, Typography } from '@mui/material';

const statusColors = {
    pending: 'warning',
    approved: 'success',
    rejected: 'error',
};

const ActivityList = ({ activities }) => {
    if (activities.length === 0) {
        return <Typography>You have not submitted any activities yet.</Typography>;
    }

    return (
        <List>
            {activities.map(activity => (
                <ListItem key={activity._id} divider>
                    <ListItemText
                        primary={activity.title}
                        secondary={`Type: ${activity.type}`}
                    />
                    <Chip
                        label={activity.status}
                        color={statusColors[activity.status]}
                        size="small"
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ActivityList;