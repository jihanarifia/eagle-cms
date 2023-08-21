import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { iDirectory } from 'src/models/directory';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface DirectoryTableProps {
  className?: string;
  directories: iDirectory[];
}

// const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
//   const map = {
//     failed: {
//       text: 'Failed',
//       color: 'error'
//     },
//     completed: {
//       text: 'Completed',
//       color: 'success'
//     },
//     pending: {
//       text: 'Pending',
//       color: 'warning'
//     }
//   };

//   const { text, color }: any = map[cryptoOrderStatus];

//   return <Label color={color}>{text}</Label>;
// };

// const applyFilters = (
//   cryptoOrders: CryptoOrder[],
//   // filters: Filters
// ): CryptoOrder[] => {
//   return cryptoOrders.filter((cryptoOrder) => {
//     let matches = true;

//     if (filters.status && cryptoOrder.status !== filters.status) {
//       matches = false;
//     }

//     return matches;
//   });
// };

const applyPagination = (
  directories: iDirectory[],
  page: number,
  limit: number
): iDirectory[] => {
  return directories.slice(page * limit, page * limit + limit);
};

const DirectoryTable: FC<DirectoryTableProps> = ({ directories }) => {
  const [selectedDirectories, setSelectedDirectories] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedDirectories.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
  };

  const handleSelectAllDirectories = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedDirectories(
      event.target.checked
        ? directories.map((directory) => directory.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    directoryId: string
  ): void => {
    if (!selectedDirectories.includes(directoryId)) {
      setSelectedDirectories((prevSelected) => [
        ...prevSelected,
        directoryId
      ]);
    } else {
      setSelectedDirectories((prevSelected) =>
        prevSelected.filter((id) => id !== directoryId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedDirectories = applyPagination(
    directories,
    page,
    limit
  );
  const selectedSomeDirectories =
    selectedDirectories.length > 0 &&
    selectedDirectories.length < directories.length;
  const selectedAllDirectories =
    selectedDirectories.length === directories.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllDirectories}
                  indeterminate={selectedSomeDirectories}
                  onChange={handleSelectAllDirectories}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>NIP</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Expertise</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDirectories.map((directory) => {
              const isDirectorySelected = selectedDirectories.includes(
                directory.id
              );
              return (
                <TableRow
                  hover
                  key={directory.id}
                  selected={isDirectorySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isDirectorySelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, directory.id)
                      }
                      value={isDirectorySelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {directory.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(directory.orderDate, 'MMMM dd yyyy')}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {directory.nip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {directory.position}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {directory.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {directory.expertise}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(cryptoOrder.amount).format(
                        `${cryptoOrder.currency}0,0.00`
                      )}
                    </Typography> */}
                  </TableCell>
                  {/* <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
                  </TableCell> */}
                  <TableCell align="right">
                    <Tooltip title="Edit Directory" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Directory" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={directories.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

DirectoryTable.propTypes = {
  directories: PropTypes.array.isRequired
};

DirectoryTable.defaultProps = {
  directories: []
};

export default DirectoryTable;
