import React, { useRef, useState } from 'react';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DataPrompt from '../../../components/DataPrompt/DataPrompt';
import CircularLoadingIndicator from '../../../components/LoadingIndicator/CircularLoadingIndicator';
import useFetchDataScroll from '../../../hooks/useFetchDataScroll';
import { useLocation } from 'react-router-dom';
import SelectUi from '../../../components/UI/SelectUI/SelectUI';
import useCallServer from '../../../hooks/useCallServer';
import { errorNotification } from '../../../utils/notification-utils';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';
import AdminCreateCodeDialog from '../../../components/Dialogs/AdminCreateCodeDialog/AdminCreateCodeDialog';

const queryString = require('query-string');
const AdminPromoCodes = () => {
    const tbodyRef = useRef();
    const location = useLocation();
    let { page = 1 } = queryString.parse(location.search);
    const [openCreateCode, setOpenCreateCode] = useState(false);
    const [, , , , callServer] = useCallServer();
    const dispatch = useDispatch();
    const [codePage, setCodesPage] = useState(page);
    let [loading, codes, setCodes] = useFetchDataScroll(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/codes?page=${codePage}`
    );
    const handleScroll = (e) => {
        if (tbodyRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = tbodyRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                let noOfPages = Math.ceil(codes.total / 20);
                let newPage = page + 1;
                if (newPage <= noOfPages) {
                    setCodesPage(newPage);
                }
            }
        }
    };
    const handleCodeStatusChange = (code) => {
        dispatch(setLoading(true));
        callServer(
            'PUT',
            `${process.env.REACT_APP_API_ENDPOINT}/admin/codes/${code.code}`,
            { is_active: !code.is_active }
        )
            .then(() => {
                setCodes((prevState) => {
                    let codeList = [...prevState.data];
                    let isFound = codeList.findIndex(
                        (item) => item._id === code._id
                    );
                    if (isFound >= 0) {
                        codeList[isFound].is_active = !code.is_active;
                    }
                    return {
                        total: prevState.total,
                        data: codeList,
                    };
                });
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Code');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    const createNewCode = () => {
        setOpenCreateCode(true);
    };
    const closeCreateCodeDialog = () => {
        setOpenCreateCode(false);
    };
    const handleNewCodes = (codes) => {
        setCodes((prevState) => {
            closeCreateCodeDialog();
            return {
                total: prevState.total + codes.codes.length,
                data: [...codes.codes, ...prevState.data],
            };
        });
    };
    return (
        <div className={'adminCodesContainer'}>
            <AdminCreateCodeDialog
                open={openCreateCode}
                close={closeCreateCodeDialog}
                getCreatedCodesList={handleNewCodes}
            />
            <div className={'bar'}>
                <p>Total: {codes.total}</p>
                <ButtonUI
                    name={'create'}
                    width={'15rem'}
                    clickHandler={createNewCode}
                />
            </div>
            <div className={'listWrapper'}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">code</th>
                            <th scope="col">type</th>
                            <th scope="col">percentage</th>
                            <th scope="col">max discount</th>
                            <th scope="col">count</th>
                            <th scope="col">active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody onScroll={handleScroll} ref={tbodyRef}>
                        {codes && codes.data.length
                            ? codes.data.map((code, index) => {
                                  return (
                                      <tr key={code._id}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{code.code}</td>
                                          <td>{code.code_type}</td>
                                          <td>{code.percentage}%</td>
                                          <td>
                                              {code.max_discount
                                                  ? 'EGP' + code.max_discount
                                                  : '--'}
                                          </td>
                                          <td>{code.count}</td>
                                          <td>
                                              {' '}
                                              <FiberManualRecordIcon
                                                  fontSize={'large'}
                                                  style={{
                                                      color: code.is_active
                                                          ? '#00fb4c'
                                                          : '#ee4543',
                                                  }}
                                              />
                                          </td>
                                          <td className={'controls'}>
                                              <SelectUi
                                                  handleChange={() =>
                                                      handleCodeStatusChange(
                                                          code
                                                      )
                                                  }
                                                  label={'status'}
                                                  value={
                                                      code.is_active
                                                          ? 'active'
                                                          : 'disabled'
                                                  }
                                                  list={['active', 'disabled']}
                                              />
                                          </td>
                                      </tr>
                                  );
                              })
                            : !loading && (
                                  <tr
                                      style={{
                                          display: 'flex',
                                      }}
                                  >
                                      <td
                                          style={{
                                              display: 'flex',
                                              flexGrow: 1,
                                          }}
                                      >
                                          <DataPrompt
                                              message={
                                                  'No products were found.'
                                              }
                                          />
                                      </td>
                                  </tr>
                              )}
                        {loading && (
                            <tr className={'loadingTr'}>
                                <td colSpan={6}>
                                    <CircularLoadingIndicator height={'5rem'} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPromoCodes;
