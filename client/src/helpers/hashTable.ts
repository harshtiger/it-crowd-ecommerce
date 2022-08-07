// /**
//  *  keyOf---> belongs to a property of an interface
//  */

interface Table {
    [key: string]: string[];
  }
  
  export interface Hash {
    table: Table;
  }
  
  class HashTable {
    table: Table = {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
      h: [],
      i: [],
      j: [],
      k: [],
      l: [],
      m: [],
      n: [],
      o: [],
      p: [],
      q: [],
      r: [],
      s: [],
      t: [],
      u: [],
      v: [],
      w: [],
      x: [],
      y: [],
      z: [],
    };
  
    /**
     * addItem
     */
    public addItem(name: string) {
      name=name.trim();
      const firstLetter: string = name[0].toLocaleLowerCase();
      // console.log("the name is: ", name);
      if (name && this.table[firstLetter]) {
        this.table[firstLetter].push(name);
      }
    }
  
    /**
     * autocomplete
     */
    
    public autocomplete(letter: string) {
      let tenNames: string[] = []; //Max 4 words
  
      // if(typeof letter === 'string') return tenNames;
      // console.log('the letter is: ',letter,typeof letter)
  
      const firstLetter: string = letter[0].toLowerCase();
      // console.log('FIRSTNAME: ',firstLetter)
      if (this.table[firstLetter]) {
        const names: string[] = this.table[firstLetter]; //all the names of the array
        // console.log('names: ',names)
  
        //if letter exists, we look for the best coincidence 
        let corte = 0;
        for (let i = 0; i < names.length; i++) {
          if (corte > 1000) break;
          if (tenNames.length > 5) break;
          if (names[i].toLowerCase().startsWith(letter.toLowerCase())) {
            tenNames.push(names[i]);
          }
          corte++;
        }
        // console.log("matching names are: ", tenNames);
      }
      return tenNames;
    }
  }
  
  export default HashTable;
  