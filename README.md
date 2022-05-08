# ToDo

To run:
npm run start:electron

1. Correct preview with reactive texts
2. Proper transcoding of all added elements
3. Autosave?
4. Circle transcoding - Done
5. Text aligning
6. Delete multiple selected elements - Done
7. Fix reloading polyline to be editable - Done
8. Bones

9. Przesuwanie grupy elementow a ich pozycja bazowa
#How to run
1. Using electron:
   ```npm start:electron```

  Electron build can be used for faster frontend development since it has hot-reload functional.
2. Using neutralino:
      ```npm start:neutralino```
   
Neutralino is much lighter and uses OS web browser instead of Chromium.
#How to build production app
Run command: `npm build_prod_neutralino`

Result will be packed to .exe inside `dist/a3-mfd-drawer` directory.


#Note
If you add any element-specific property, define it also in:
`ProjectFileStructure.ts/parseProjectToFile()`
