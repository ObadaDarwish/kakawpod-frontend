import React, { useRef, useState } from 'react';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import EditIcon from '@material-ui/icons/Edit';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import DeleteIcon from '@material-ui/icons/Delete';
import DataPrompt from '../../../components/DataPrompt/DataPrompt';
import CircularLoadingIndicator from '../../../components/LoadingIndicator/CircularLoadingIndicator';
import useFetchDataScroll from '../../../hooks/useFetchDataScroll';
import { useLocation } from 'react-router-dom';
const queryString = require('query-string');
const AdminPromoCodes = () => {
    const tbodyRef = useRef();
    const location = useLocation();
    let { page = 1 } = queryString.parse(location.search);
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
    return (
        <div className={'adminCodesContainer'}>
            <div className={'bar'}>
                <p>Total: {codes.total}</p>
                <ButtonUI name={'create'} width={'15rem'} />
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
                                              {/*<EditIcon*/}
                                              {/*    fontSize={'large'}*/}
                                              {/*    onClick={() =>*/}
                                              {/*        handleEditProductDialog(*/}
                                              {/*            product*/}
                                              {/*        )*/}
                                              {/*    }*/}
                                              {/*/>*/}
                                              {/*{product.is_deleted ? (*/}
                                              {/*    <SettingsBackupRestoreIcon*/}
                                              {/*        fontSize={'large'}*/}
                                              {/*        onClick={() =>*/}
                                              {/*            confirmToggleDeleteProduct(*/}
                                              {/*                product*/}
                                              {/*            )*/}
                                              {/*        }*/}
                                              {/*    />*/}
                                              {/*) : (*/}
                                              {/*    <DeleteIcon*/}
                                              {/*        fontSize={'large'}*/}
                                              {/*        onClick={() =>*/}
                                              {/*            confirmToggleDeleteProduct(*/}
                                              {/*                product*/}
                                              {/*            )*/}
                                              {/*        }*/}
                                              {/*    />*/}
                                              {/*)}*/}
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
