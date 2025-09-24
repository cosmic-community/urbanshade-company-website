import { Installation } from '@/types'
import InstallationCard from './InstallationCard'
import Link from 'next/link'

interface InstallationsPreviewProps {
  installations: Installation[]
}

export default function InstallationsPreview({ installations }: InstallationsPreviewProps) {
  if (installations.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {installations.map((installation) => (
          <InstallationCard key={installation.id} installation={installation} />
        ))}
      </div>
      
      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          href="/installations"
          className="btn btn-outline"
        >
          View All Projects
        </Link>
      </div>
    </div>
  )
}