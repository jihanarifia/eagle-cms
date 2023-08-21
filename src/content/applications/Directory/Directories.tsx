import { Card } from '@mui/material';

import db from '../../../firebase';
import { useState, useEffect } from 'react';
import DirectoryTable from './DirectoryTable';

function GetDirectories() {
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    let ref = db.ref("directory")
    ref.on("value", snapshot => {
      const dirs = []
      snapshot.forEach( item => {
        const directory = item.val()
        dirs.push(directory)
      })
      setDirectories(dirs)
    });
  }, [])

  return (
    <Card>
      <DirectoryTable directories={directories} />
    </Card>
  );
}

export default GetDirectories;
