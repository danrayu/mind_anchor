import React from 'react'

function MainView({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div>
        {children}
      </div>
    </main>
  )
}

export default MainView