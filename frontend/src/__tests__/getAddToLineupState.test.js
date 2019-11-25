import { getAddToLineupState } from '../functions/getAddToLineupState'

describe('adds player to lineup', () => {
    let playerPool = [
        {name: 'Player0', playerId: 0, position: 'QB'},
        {name: 'Player1', playerId: 1, position: 'QB'},
        {name: 'Player2', playerId: 2, position: 'RB'},
        {name: 'Player3', playerId: 3, position: 'RB'},
        {name: 'Player4', playerId: 4, position: 'RB'},
        {name: 'Player5', playerId: 5, position: 'RB'}
        ];
    let whiteList = [];
    let blackList = [
        {name: 'Player0', playerId: 0, position: 'QB'},
        {name: 'Player2', playerId: 2, position: 'RB'},
        {name: 'Player3', playerId: 3, position: 'RB'},
        {name: 'Player4', playerId: 4, position: 'RB'}
        ];
    test('player already added', () => {
        let lineup = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: '', playerId: '', position: 'RB'},
            {name: '', playerId: '', position: 'RB'},
            {name: '', playerId: '', position: 'RB,WR,TE'}
        ];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(getAddToLineupState(0, state)).toEqual('Player already added to lineup.');
    });
    test('not enough non-flex positions available', () => {
        let lineup = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: '', playerId: '', position: 'RB'},
            {name: '', playerId: '', position: 'RB'},
            {name: '', playerId: '', position: 'RB,WR,TE'}
        ];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(getAddToLineupState(1, state)).toEqual('Not enough positions available to add player.');
    });
    test('not enough flex positions available', () => {
        let lineup = [
            {name: '', position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'}
        ];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(getAddToLineupState(5, state)).toEqual('Not enough positions available to add player.');
    });
    test('can add non-flex position', () => {
        let playerPool = [
        {name: 'Player0', playerId: 0, position: 'QB'},
        {name: 'Player1', playerId: 1, position: 'QB'},
        {name: 'Player2', playerId: 2, position: 'RB'},
        {name: 'Player3', playerId: 3, position: 'RB'},
        {name: 'Player4', playerId: 4, position: 'RB'},
        {name: 'Player5', playerId: 5, position: 'RB'}
        ];
        let whiteList = [];
        let blackList = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'}
            ];
        let lineup = [
            {name: '', playerId: '', position: 'QB'},
            {name: '', playerId: '', position: 'RB'},
            {name: '', playerId: '', position: 'RB'},
            {name: '', playerId: '', position: 'RB,WR,TE'}
        ];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(getAddToLineupState(0, state)).toMatchObject({
            lineup: [
                {name: 'Player0', position: 'QB'},
                {name: '', playerId: '', position: 'RB'},
                {name: '', playerId: '', position: 'RB'},
                {name: '', playerId: '', position: 'RB,WR,TE'}
            ],
            whiteList: [{name: 'Player0', position: 'QB'}],
            blackList: [
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: 'Player3', playerId: 3, position: 'RB'},
                {name: 'Player4', playerId: 4, position: 'RB'}
                ],
            filteredPool: null,
            searchText: ''
        });
    });
    test('can add flex position to non-flex spot', () => {
        let lineup = [
                {name: '', playerId: '', position: 'QB'},
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: '', playerId: '', position: 'RB'},
                {name: '', playerId: '', position: 'RB,WR,TE'}
                ];
        let playerPool = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: 'Player1', playerId: 1, position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'},
            {name: 'Player5', playerId: 5, position: 'RB'}
            ];
        let whiteList = [];
        let blackList = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'}
            ];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(getAddToLineupState(3, state)).toMatchObject({
            lineup: [
                {name: '', playerId: '', position: 'QB'},
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: 'Player3', playerId: 3, position: 'RB'},
                {name: '', playerId: '', position: 'RB,WR,TE'}
            ],
            whiteList: [{name: 'Player3', position: 'RB'}],
            blackList: [
                {name: 'Player0', playerId: 0, position: 'QB'},
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: 'Player4', playerId: 4, position: 'RB'}
                ],
            filteredPool: null,
            searchText: ''
        });
    });
    test('can add flex position to flex spot', () => {
        let lineup = [
            {name: '', playerId: '', position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: '', playerId: '', position: 'RB,WR,TE'}
        ];
        let playerPool = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: 'Player1', playerId: 1, position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'},
            {name: 'Player5', playerId: 5, position: 'RB'}
            ];
        let whiteList = [];
        let blackList = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'}
            ];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(playerPool[4]).toMatchObject({name: 'Player4', position: 'RB'});
        expect(getAddToLineupState(4, state)).toMatchObject({
            lineup: [
                {name: '', playerId: '', position: 'QB'},
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: 'Player3', playerId: 3, position: 'RB'},
                {name: 'Player4', playerId: 4, position: 'RB,WR,TE'}
            ],
            whiteList: [{name: 'Player4', playerId: 4, position: 'RB'}],
            blackList: [
                {name: 'Player0', playerId: 0, position: 'QB'},
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: 'Player3', playerId: 3, position: 'RB'}
            ],
            filteredPool: null,
            searchText: ''
        });
    });
    test('can add player to multi-position spot', () => {
        let lineup = [
            {name: '', playerId: '', position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: '', playerId: '', position: 'RB/WR'}
        ];
        let playerPool = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: 'Player1', playerId: 1, position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'},
            {name: 'Player5', playerId: 5, position: 'WR'}
            ];
        let whiteList = [];
        let blackList = [];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(getAddToLineupState(5, state)).toMatchObject({
            lineup: [
                {name: '', playerId: '', position: 'QB'},
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: 'Player3', playerId: 3, position: 'RB'},
                {name: 'Player5', playerId: 5, position: 'RB/WR'}
            ],
            whiteList: [{name: 'Player5', playerId: 5, position: 'WR'}],
            blackList: [],
            filteredPool: null,
            searchText: ''
        });
    });
    test('can add multi-position player', () => {
        let lineup = [
            {name: '', playerId: '', position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: '', playerId: '', position: 'WR'}
        ];
        let playerPool = [
            {name: 'Player0', playerId: 0, position: 'QB'},
            {name: 'Player1', playerId: 1, position: 'QB'},
            {name: 'Player2', playerId: 2, position: 'RB'},
            {name: 'Player3', playerId: 3, position: 'RB'},
            {name: 'Player4', playerId: 4, position: 'RB'},
            {name: 'Player5', playerId: 5, position: 'RB/WR'}
            ];
        let whiteList = [];
        let blackList = [];
        let state = {playerPool, lineup, whiteList, blackList};
        expect(getAddToLineupState(5, state)).toMatchObject({
            lineup: [
                {name: '', playerId: '', position: 'QB'},
                {name: 'Player2', playerId: 2, position: 'RB'},
                {name: 'Player3', playerId: 3, position: 'RB'},
                {name: 'Player5', playerId: 5, position: 'WR'}
            ],
            whiteList: [{name: 'Player5', playerId: 5, position: 'RB/WR'}],
            blackList: [],
            filteredPool: null,
            searchText: ''
        });
    });
});
