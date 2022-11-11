import { getAssignmentMatrix } from "./Employees";

describe("Test assignment of desks to employees", () => {
    it("Handle conflicts", () => {
        const employees = {
            '1': {
              name: 'E1',
              preferedDesks: [ 'D1', 'D2', 'D3' ],
            },
            '2': { name: 'E2', preferedDesks: [ 'D1', 'D3' ], },
            '3': {
              name: 'E3',
              preferedDesks: [ 'D3' ],
            },
            '4': { name: 'E4', preferedDesks: [ 'D3', 'D2' ], },
            '5': { name: 'E5', preferedDesks: [ 'D1', 'D4' ], }
          };
    
          const M = getAssignmentMatrix(employees);
          expect(M.map(e => e[0])).toStrictEqual(['D2', 'D1', '', 'D3', 'D4']);
    });

    it("No conflicts", () => {
        const employees = {
            '1': {
              name: 'E1',
              preferedDesks: [ 'D2', 'D1', 'D3' ],
            },
            '2': { name: 'E2', preferedDesks: [ 'D1', 'D3' ], },
            '3': {
              name: 'E3',
              preferedDesks: [ 'D3' ],
            },
            '4': { name: 'E4', preferedDesks: [ 'D5', 'D2' ], },
            '5': { name: 'E5', preferedDesks: [ 'D4', 'D1' ], }
          };
    
          const M = getAssignmentMatrix(employees);
          expect(M.map(e => e[0])).toStrictEqual(['D2', 'D1', 'D3', 'D5', 'D4']);
    });

    it('No prefered desks', () => {
        const employees = {
            '1': {
              name: 'E1',
              preferedDesks: [ ],
            },
            '2': { name: 'E2', preferedDesks: [ ], },
            '3': {
              name: 'E3',
              preferedDesks: [ ],
            },
            '4': { name: 'E4', preferedDesks: [ ], },
            '5': { name: 'E5', preferedDesks: [ ], }
          };
    
          const M = getAssignmentMatrix(employees);
          expect(M).toStrictEqual(Array(5).fill([]));
    });

    it('Some employees have prefered desks', () => {
        const employees = {
            '1': {
              name: 'E1',
              preferedDesks: [ 'D1', 'D2', 'D3' ],
            },
            '2': { name: 'E2', preferedDesks: [ ], },
            '3': {
              name: 'E3',
              preferedDesks: [ 'D1', 'D4' ],
            },
            '4': { name: 'E4', preferedDesks: [ ], },
            '5': { name: 'E5', preferedDesks: [ ], }
          };
    
          const M = getAssignmentMatrix(employees);
          const expected = Array(5).fill([]);
          expected[0] = [ 'D2', 'D1', 'D3' ];
          expected[2] = [ 'D1', 'D4' ];
          expect(M).toStrictEqual(expected);
    });

    it('Same prefered desks', () => {
        const employees = {
            '1': {
              name: 'E1',
              preferedDesks: [ 'D1', 'D2', 'D3' ],
            },
            '2': { name: 'E2', preferedDesks: [ 'D1', 'D2', 'D3' ], },
            '3': {
              name: 'E3',
              preferedDesks: [ 'D1', 'D2', 'D3' ],
            },
            '4': { name: 'E4', preferedDesks: [ 'D1', 'D2', 'D3' ], },
            '5': { name: 'E5', preferedDesks: [ 'D1', 'D2', 'D3' ], }
          };
    
          const M = getAssignmentMatrix(employees);
          const expected = [
            [ 'D2', 'D1', 'D3' ],
            [ 'D3', 'D2', 'D1' ],
            [ '', '', '' ],
            [ '', '', '' ],
            [ 'D1', 'D2', 'D3' ]
          ];    
          expect(M).toStrictEqual(expected);
    });

    it('Mostly same prefered desks', () => {
        const employees = {
            '1': {
              name: 'E1',
              preferedDesks: [ 'D1', 'D2' ],
            },
            '2': { name: 'E2', preferedDesks: [ 'D1', 'D2' ], },
            '3': {
              name: 'E3',
              preferedDesks: [ 'D1', 'D2', 'D3' ],
            },
          };
    
          const M = getAssignmentMatrix(employees);
          const expected = [
            [ 'D2', 'D1' ],
            [ 'D1', 'D2' ],
            [ 'D3', 'D2', 'D1' ]
          ];    
          expect(M).toStrictEqual(expected);
    });
      
})