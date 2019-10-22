import React from 'react';
import {Button, Card, Divider, Icon, IconButton, Typography} from '@material-ui/core';

function Widget9(props)
{
    return (
        <Card className="w-full rounded-8 shadow-none border-1">

            <div className="p-16 pr-4 flex flex-row items-center justify-between">

                <Typography className="h1 pr-16">Top campaigns</Typography>

                <div>
                    <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                    </IconButton>
                </div>
            </div>

            <table className="simple clickable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-right">Views</th>
                        <th className="text-right">Conv</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={"Campain 1"}>
                            <td>{"35% Off Blue 15lb"}</td>
                            <td className="text-right">{"1985"}</td>
                            <td className="text-right">{"367"}</td>
                        </tr>
                        <tr key={"Campain 2"}>
                            <td>{"20% Off Science Diet 20lb"}</td>
                            <td className="text-right">{"1597"}</td>
                            <td className="text-right">{"312"}</td>
                        </tr>
                        <tr key={"Campain 3"}>
                            <td>{"10% Off Bark Box"}</td>
                            <td className="text-right">{"1032"}</td>
                            <td className="text-right">{"256"}</td>
                        </tr>
                        <tr key={"Campain 4"}>
                            <td>{"25% Off Nutrish 20lb"}</td>
                            <td className="text-right">{"897"}</td>
                            <td className="text-right">{"213"}</td>
                        </tr>
                </tbody>
            </table>

            <Divider className="card-divider w-full"/>

            <div className="p-8 pt-16 flex flex-row items-center">
                <Button>GO TO CAMPAIGNS</Button>
            </div>
        </Card>
    );
}

export default React.memo(Widget9);
