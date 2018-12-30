import React from "react";
import { Query, Subscription } from "react-apollo";

import Spinner from "../../components/UI/Spinner/Spinner";
import Table from "../../components/Table/Table";
import classes from "./Departments.css";

import QUERY_LIST_DEPARTMENTS from "../../graphql/queries/listDepartments";
import SUBSCRIPTION_DEPARTMENT_UPDATE from "../../graphql/subscriptions/departmentUpdate";

const Departments = () => (
    <React.Fragment>
    <Subscription
        subscription={SUBSCRIPTION_DEPARTMENT_UPDATE}
    >
    </Subscription>
    <Query query={QUERY_LIST_DEPARTMENTS}>
        {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <Spinner />;
            if (error) throw error;

            return (
                <div className={classes.TableContainer}>
                    <Table
                        title="Departments"
                        selectable={true}
                        emptyTableMessage="No departments found"
                        {...data.listDepartments}
                        subscribeToUpdates={() => {
                            console.log('subscribeToUpdates');
                            subscribeToMore({
                                document: SUBSCRIPTION_DEPARTMENT_UPDATE,
                                updateQuery: (prev, { subscriptionData }) => {
                                    console.log(prev, subscriptionData);
                                    return prev;
    
                                    //if (!subscriptionData.data) return prev;
                                    //const newEdit = subscriptionData.data.newEdit;
                                    // const i = prev.fields.findIndex(field => fieldName === field.name);
                                    /* return Object.assign({}, prev, {
                                    entry: {
                                      comments: [newFeedItem, ...prev.entry.comments]
                                    }*/
                                }
                            })
                        }}
                    />
                </div>
            );
        }}
    </Query>
    </React.Fragment>
);

export default Departments;
