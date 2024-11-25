import routerExec from '@server/lib/router.exec'
import { TRoute } from '@server/types/route'
import main from '@server/router/api/main'
import record from '@server/router/api/record'

const routes: Array<TRoute> = [...main, ...record]

export default routerExec(routes)
