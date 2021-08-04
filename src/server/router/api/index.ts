import routerExec from '../../lib/router.exec'
import { IRoute } from '../../types/route'
import main from './main'
import record from './record'

const routes: Array<IRoute> = [...main, ...record]

export default routerExec(routes)
