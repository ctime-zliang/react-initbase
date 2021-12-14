import routerExec from '@server/lib/router.exec'
import { IRoute } from '@server/types/route'
import main from '@server/router/api/main'
import record from '@server/router/api/record'

const routes: Array<IRoute> = [...main, ...record]

export default routerExec(routes)
