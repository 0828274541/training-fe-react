import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useCallback } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { debounce } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Label from '../../components/Label';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
//
import { usersApi } from '../../apis/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'firstName', label: 'Firstname', alignRight: false },
  { id: 'lastName', label: 'Lastname', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '' }
];

export default function User() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('username');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [keyWord, setKeyword] = useState('');
  console.log(keyWord);
  // eslint-disable-next-line func-names
  async function getUser() {
    const result = await usersApi.paging({
      search: keyWord,
      page,
      limit: rowsPerPage,
      sort_column: orderBy,
      sort_direction: order
    });
    if (result.data.code === 200) {
      const {
        docs: userList, limit, page: pageReturn, totalDocs
      } = result.data.users;
      if (userList.length) {
        setPage(pageReturn);
        setRowsPerPage(limit);
        setTotalPage(totalDocs);
        setUsers(userList);
      } else {
        setUsers([]);
        setTotalPage(totalDocs);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, [page, rowsPerPage, order, keyWord]);

  const debounceLoadData = useCallback(debounce((e) => {
    setKeyword(e);
  }, 1000), []);

  // ham get value search (filtername)
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(1);
    setRowsPerPage(5);
    debounceLoadData(event.target.value);
  };

  const isUserNotFound = users.length === 0;

  const handleRequestSort = (event, property) => {
    if (property === 'role' || isUserNotFound) {
      return;
    }
    const isAsc = orderBy === property && order === '';
    setOrder(isAsc ? '-' : '');
    setOrderBy(property);
    setSelected([]);
  };

  // select all row
  const handleSelectAllClick = (event) => {
    if (isUserNotFound) {
      return;
    }
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // select row
  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  // thay doi page
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    setSelected([]);
  };
  // thay doi per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, minHeight: 440 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {users
                    .map((row) => {
                      const {
                        id, username, role, firstName, lastName
                      } = row;
                      const isItemSelected = selected.indexOf(username) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, username)}
                            />
                          </TableCell>
                          <TableCell align="left" width="25%">{username}</TableCell>
                          <TableCell align="left" width="25%">{firstName}</TableCell>
                          <TableCell align="left" width="25%">{lastName}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              // eslint-disable-next-line no-nested-ternary
                              color={role[0] === 'admin' ? 'success' : role[0] === 'contributor' ? 'warning' : 'info'}
                            >
                              {sentenceCase(role[0])}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          {!isUserNotFound && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            page={page - 1}
            count={totalPage}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          )}
        </Card>
      </Container>
    </Page>
  );
}
