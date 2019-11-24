import * as React from 'react';

interface playerAttributes {
    position: string,
    displayPosition: string,
    team: string,
    name: string,
    projection: number,
    salary: number,
    opponent: string,
    gameDate: string
}

interface playerProps {
    player: playerAttributes,
    onRemove: () => void,
    whiteList: playerAttributes[]
}

const Player = (props: playerProps) => {
    return (
        <tr style={{backgroundColor: (
            props.player.name && props.whiteList
                .filter((player) => player.name)
                .map((player) => (player.name))
                .includes(props.player.name)) ? 'lightgreen' : 'white'}}>
            <td>{props.player.displayPosition}</td>
            <td>{props.player.team}</td>
            <td style={{fontWeight: (props.player.position) ? 'normal' : 'bold'}}>
                {props.player.name}</td>
            <td style={{fontWeight: (props.player.position) ? 'normal' : 'bold'}}>
                {props.player.projection ? props.player.projection.toFixed(1) : null}</td>
            <td style={{fontWeight: (props.player.position) ? 'normal' : 'bold'}}>
                {props.player.salary && '$'.concat(props.player.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</td>
            <td>{props.player.opponent}</td>
            <td>{props.player.gameDate}</td>
            <td>
                {props.player.position && props.player.name && <button onClick={props.onRemove} style={{fontWeight: 'bold'}}>X</button>}
            </td>
        </tr>
    );
};

export const Lineup = (props: {
    dfsLineup: playerAttributes[],
    removePlayer: (playerIndex: number) => void,
    site: string,
    whiteList: playerAttributes[],
    pointSum: number,
    salarySum: number,
    cap: number}) =>
        <table className={'Dfs-grid'}>
            <tbody>
            <tr style={{backgroundColor: (props.site === 'fd') ? 'dodgerblue' : 'black'}}>
                <th>Position</th>
                <th>Team</th>
                <th>Player</th>
                <th>Projection</th>
                <th>Salary</th>
                <th>Opponent</th>
                <th>Game Date</th>
                <th>Remove</th>
            </tr>
            {props.dfsLineup.map(
                (player, playerIndex) => (
                    <Player player={player}
                            onRemove={() => props.removePlayer(playerIndex)}
                            whiteList={props.whiteList}
                    />
                )
            )}
            <tr style={{fontWeight: 'bold'}}>
                <td>{null}</td>
                <td>{null}</td>
                <td>Total</td>
                <td>{props.pointSum.toFixed(1)}</td>
                <td style={{color: (props.salarySum > props.cap) ? 'indianred' : 'black'}}>
                    {'$'.concat(props.salarySum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                </td>
                <td>{null}</td>
                <td>{null}</td>
                <td>{null}</td>
            </tr>
            </tbody>
        </table>;