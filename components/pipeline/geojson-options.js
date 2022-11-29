import theme from '@/styles/theme'

const GeoJSONOptions = () => (
  <table cellSpacing='0'>
    <thead>
      <tr>
        <th>Format</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><div className='option'>GeoJSON</div></td>
      </tr>
    </tbody>

    <style jsx>{`
          table {
              width: 100%;
              background: ${theme.bkgPrimary};
              border-radius: 3px;
              text-align: center;
              border-collapse: collapse;
          }
  
          thead {
              color: white;
              font-weight: bold;
              border-bottom: solid 1px ${theme.borderLight};
          }
  
          th, td {
              padding: 1em;
          }
  
          .option {
              padding: .4em;
              background-color: white;
              border-radius: 4px;
              height: 20px;
          }
        `}</style>
  </table>

)

export default GeoJSONOptions
