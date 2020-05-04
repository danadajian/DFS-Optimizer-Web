import { handleRemovePlayerFromLineup } from './handleRemovePlayerFromLineup'

const setState = jest.fn();

describe('removePlayerFromLineup', () => {
    let result: any;
    const state = {
        lineup: [
            {position: 'QB', displayPosition: 'QB', team: 'team1', name: 'Player1', playerId: 1},
            {position: 'RB', displayPosition: 'RB', team: 'team2', name: 'Player2', playerId: 2},
            {position: 'RB', displayPosition: 'RB', playerId: 0},
            {position: 'RB,WR,TE', displayPosition: 'FLEX', playerId: 0},
        ],
        whiteList: [2],
        lineupPositions: ['QB', 'RB', 'RB', 'RB,WR,TE'],
        displayMatrix: ['QB', 'RB', 'RB', 'FLEX']
    }

    beforeEach(() => {
        // @ts-ignore
        result = handleRemovePlayerFromLineup(1, state, setState)
    })

    it('should call setState with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            ...state,
            lineup: [
                {position: 'QB', displayPosition: 'QB', team: 'team1', name: 'Player1', playerId: 1},
                {position: 'RB', displayPosition: 'RB', playerId: 0},
                {position: 'RB', displayPosition: 'RB', playerId: 0},
                {position: 'RB,WR,TE', displayPosition: 'FLEX', playerId: 0},
            ],
            whiteList: [],
            searchText: '',
            filteredPool: []
        })
    });
});