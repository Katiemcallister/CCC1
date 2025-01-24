const fs = require('fs');

class AbstractDataService {
    // Helper function to read data from JSON file
    _read() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading '+this.plural+':', err);
            return [];
        }
    }

    // Helper function to write data to JSON file
    _write(data) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (err) {
            console.error('Error reading '+this.plural+':', err);
        }
    }

    // Get all entries
    getAll() {
        return this._read();
    }

    // Get a entry by ID
    getById(id) {
        const data = this._read();
        return data.find(e => e.id === id);
    }

    // Create a new entry
    create(newEntry) {
        const data = this._read();
        newEntry.id = data.length ? data[data.length - 1].id + 1 : 1;
        data.push(newEntry);
        this._write(data);
        return newEntry;
    }

    // Update an entry by ID
    update(id, updatedEntry) {
        const data = this._read();
        const entryIndex = data.findIndex(e => e.id === id);
        if (entryIndex === -1) return null;

        updatedEntry.id = id;
        data[entryIndex] = updatedEntry;
        this._write(data);
        return updatedEntry;
    }

    // Delete an entry by ID
    delete(id) {
        const data = this._read();
        const entryIndex = data.findIndex(e => e.id === id);
        if (entryIndex === -1) return null;

        const deletedEntries = data.splice(entryIndex, 1);
        this._write(data);
        return deletedEntries[0];
    }
}

module.exports = AbstractDataService;