import * as React from 'react';
import '../css/BlackList.css'
import {lineupAttributes} from "../interfaces";

interface playerProps {
    player: lineupAttributes
}

const Player = (props: playerProps) =>
    <tr>
        <td>
            <tr className="Player-name">{props.player.name}</tr>
            <tr>{props.player.team} {props.player.position}</tr>
        </td>
    </tr>;

export const BlackList = (props: {
    blackList: number[],
    playerPool: lineupAttributes[]
}) => {
    return (
        <div className="Blacklist">
            <h2 className="Dfs-header">Blacklist</h2>
            <table className="Dfs-grid">
                <tbody>
                <tr>
                    <th>Player</th>
                </tr>
                {props.blackList.map(
                    (playerId: number) =>
                        <Player player={props.playerPool.find(player => player.playerId === playerId)!}/>
                )}
                </tbody>
            </table>
        </div>
    )
};