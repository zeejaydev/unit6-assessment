const {shuffleArray} = require('./utils')
const {bots} = require('./data')
describe('shuffleArray should', () => {
    test('returns an array', ()=>{
        expect(Array.isArray(shuffleArray(bots))).toBe(true);
    })
    test('returns an array of the same length as the argument sent in', ()=>{
        expect(shuffleArray(bots).length === bots.length).toBe(true);
    })
    test('check that all the same items are in the array', ()=>{
        const usShuffleArray = shuffleArray(bots).sort((a,b)=>a.id-b.id)
        //had to unshffle the array to make sure it matches the original array
        expect(usShuffleArray).toEqual(bots);
        
        //or we can do this one if we don't care about checking if new item was added to the original array
        // expect(shuffleArray(bots)).toEqual(expect.arrayContaining(bots));
        //because in this case shuffleArray method could've added a new item and the test will still pass  
    })
    test('check that the items have been shuffled around', ()=>{
        expect(shuffleArray(bots)).not.toBe(bots);
    })
})